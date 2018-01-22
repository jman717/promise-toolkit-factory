"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js');

var owner;
module.exports = class promises extends base{
	constructor(parent) {
		super(parent);
		var t = this;
		t.oname = 'promises';
		owner = t;
		t.results = {"owner": t, "parent": t.parent};
		return t;
	}	
	
	init(){
		var t = this;
		try{
			if(typeof t.conf === 'undefined')
				throw new Error('t.conf is not defined');
			if(typeof t.conf.flows === 'undefined')
				throw new Error('t.conf.flows is not defined');
			if(t.conf.flows.length === 0)
				throw new Error('t.conf.flows array is empty');
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.init", "file":"promises.js"});
		}
	}
	
	run(){
		//https://stackoverflow.com/questions/31413749/node-js-promise-all-and-foreach
		var t = this;
		var a = t.appenders, z, f = t.conf.flows, r1 = [], y;
		try{
			t.parent.log({"type":"debug", "text": "run these flows conf(" + JSON.stringify(t.conf) + ")", "classO":"promises.run", "file":"promises.js"});
			for(y = 0; y < f.length; y++){
				r1.push(new Promise((resolve, reject) => {
					setTimeout(t.process, 100, {"resolve": resolve, "reject": reject, "flow": f[y]});
				}));
			}
				
			Promise.all(r1).then(values => { 
					t.parent.log({"type":"debug", "text": "values="+JSON.stringify(values), "classO":"promises.run", "file":"promises.js"});
				}, reject => {
					t.parent.log({"type":"error", "text": "reject="+reject, "classO":"promises.run", "file":"promises.js"});
				}, resolve => {
					t.parent.log({"type":"debug", "text": "resolve="+resolve, "classO":"promises.run", "file":"promises.js"});
				}, reason => {
					t.parent.log({"type":"debug", "text": "reason="+reason, "classO":"promises.run", "file":"promises.js"});
				}, results => {
					t.parent.log({"type":"debug", "text": "results="+results, "classO":"promises.run", "file":"promises.js"});
			});
				
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.run", "file":"promises.js"});
		}
	}
	
	process(jo){
		var t = owner;
		var fl, y, r1 = [];
		try{
			if(typeof jo === 'undefined')
				return;
			if(typeof jo.resolve === 'undefined')
				return;
			t.parent.log({"type":"debug", "text": "process jo="+JSON.stringify(jo), "classO":"promises.process", "file":"promises.js"});
			if(typeof jo.flow === 'undefined')
				throw new Error('jo.flow is undefined');
			t.parent.log({"type":"debug", "text": "process flow="+jo.flow, "classO":"promises.process", "file":"promises.js"});
			fl = t.parent.getFlowAppender(jo);
	
			for(y = 0; y < fl.conf.map.length; y++){
				r1.push(new Promise((resolve, reject) => {
					setTimeout(t.process_function, 100, {"resolve": resolve, "reject": reject, "flow": jo.flow, "funcName": fl.conf.map[y], "funcANum": y});
				}));
			}
				
			Promise.all(r1).then(values => { 
					t.parent.log({"type":"debug", "text": "values="+JSON.stringify(values), "classO":"promises.process", "file":"promises.js"});
				}, reject => {
					t.parent.log({"type":"error", "text": "reject="+reject, "classO":"promises.process", "file":"promises.js"});
				}, resolve => {
					t.parent.log({"type":"debug", "text": "resolve="+resolve, "classO":"promises.process", "file":"promises.js"});
				}, reason => {
					t.parent.log({"type":"debug", "text": "reason="+reason, "classO":"promises.process", "file":"promises.js"});
				}, results => {
					t.parent.log({"type":"debug", "text": "results="+results, "classO":"promises.process", "file":"promises.js"});
			});

			//jo.resolve('goober.doob' + jo.flow);
			//jo.reject('doober0');
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.process", "file":"promises.js"});
			jo.reject(e.message);
		}
	}
	
	process_function(jo){
		var t = owner;
		var fl, fu, y, r1 = [];
		try{
			if(typeof jo === 'undefined')
				return;
			if(typeof jo.resolve === 'undefined')
				return;
			if(typeof jo.funcName === 'undefined')
				throw new Error('jo.funcName is undefined');
			if(typeof jo.funcANum === 'undefined')
				throw new Error('jo.funcANum is undefined');
			if(typeof t.results === 'undefined')
				throw new Error('t.results is undefined');
			if(typeof t.results.status === 'string' && typeof t.results.msg === 'string' && t.results.msg === 'error')
				throw new Error(t.results.msg);
			t.parent.log({"type":"debug", "text": "process_function flow(" + jo.flow + ") jo("+JSON.stringify(jo) + ')', "classO":"promises.process", "file":"promises.js"});
			if(typeof t.results.skip_to_flow !== 'undefined'){
				if(t.results.skip_to_flow === jo.flow)
					delete t.results.skip_to_flow;
				if(t.results.skip_to_flow > jo.flow)
					jo.resolve('flow(' + jo.flow + ') skipping ahead to (' + t.results.skip_to_flow + ')');
			}
			fl = t.parent.getFlowAppender(jo);
			fu = fl.funcA;
			t.results = fu[jo.funcANum](t.results);
			jo.resolve('success flow(' + jo.flow + ')');
		}catch(e){
			var msg = 'flow: ' + jo.flow + ' funcName: ' + jo.funcName + ' error: ' + e.message;
			t.parent.log({"type":"error", "text": "error: " + msg, "classO":"promises.process_function", "file":"promises.js"});
			t.results.status = 'error';
			t.results.msg = msg;
			jo.reject(msg);
		}
	}
}