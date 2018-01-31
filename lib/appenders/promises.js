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
		t.results = {"owner": owner, "parent": t.parent, "flow": 0};
		t.data = null;
		t.pjo = null;
		t._promise_queue = [];
		t.appender = null;
		t.count = -1;
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
			if(typeof t.conf.type === 'undefined')
				t.regular();
			if(t.conf.type === 'wait-before-proceeding')
				t.wait();
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.run", "file":"promises.js"});
		}
	}
	
	wait(){
		//https://stackoverflow.com/questions/31413749/node-js-promise-all-and-foreach
		var t = this;
		var a = t.appenders, z, f = t.conf.flows, r1 = [], y;
		try{
			t.parent.log({"type":"debug", "text": "run these flows conf(" + JSON.stringify(t.conf) + ")", "classO":"promises.regular", "file":"promises.js"});
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.regular", "file":"promises.js"});
		}
	}
	
	regular(){
		//https://stackoverflow.com/questions/31413749/node-js-promise-all-and-foreach
		var t = this;
		var a = t.appenders, z, f = t.conf.flows, r1 = [], y;
		try{
			t.parent.log({"type":"debug", "text": "run these flows conf(" + JSON.stringify(t.conf) + ")", "classO":"promises.regular", "file":"promises.js"});
			for(y = 0; y < f.length; y++){
				r1.push(new Promise((resolve, reject) => {
					setTimeout(t.process, 100, {"resolve": resolve, "reject": reject, "flow": f[y]});
				}));
			}
				
			Promise.all(r1).then(values => { 
					t.parent.log({"type":"debug", "text": "values="+JSON.stringify(values), "classO":"promises.regular", "file":"promises.js"});
				}, reject => {
					t.parent.log({"type":"error", "text": "reject="+reject, "classO":"promises.regular", "file":"promises.js"});
				}, resolve => {
					t.parent.log({"type":"debug", "text": "resolve="+resolve, "classO":"promises.regular", "file":"promises.js"});
				}, reason => {
					t.parent.log({"type":"debug", "text": "reason="+reason, "classO":"promises.regular", "file":"promises.js"});
				}, results => {
					t.parent.log({"type":"debug", "text": "results="+results, "classO":"promises.regular", "file":"promises.js"});
			});
				
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.regular", "file":"promises.js"});
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
			t.appender = t.parent.getFlowAppender(jo);
			t._promise_queue = t.appender.conf.map;
			t.results.flow = jo.flow;
			t.promise_queue(t.results);
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.process", "file":"promises.js"});
			jo.reject(e.message);
		}
	}
	
	promise_queue(jo){
		var t = owner;
		var fu, func;
		try{
			t.count++;
			fu = t.appender.conf.map[t.count];  
			try{
				func = t.appender.get_function({"search_for_function": fu});
			}catch(e){
				t.parent.log({"type":"debug", "text": "finished flow(" + jo.flow + ") functions(" + JSON.stringify(t.appender.conf.map) + ")", "classO":"promises.promise_queue", "file":"promises.js"});
				return;
			}
			return new Promise((resolve, reject) => {
				jo.resolve = resolve;
				jo.reject = reject;
				setTimeout(func, 100, jo);
			}).then(data => {
					t.promise_queue(data);
				}, reject => {
					t.parent.log({"type":"error", "text": "reject(" + reject + ") flow(" + jo.flow + ") functions(" + JSON.stringify(t.appender.conf.map) + ") failed on(" + fu + ")", "classO":"promises.run", "file":"promises.js"});
					jo.reject(reject);
			});
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promises.process", "file":"promises.js"});
		}
	}
}