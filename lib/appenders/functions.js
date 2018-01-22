"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js');

var owner;
module.exports = class functions extends base{
	constructor(parent) {
		super(parent);
		var t = this;
		t.oname = 'functions';
		t.funcA = [];
		t.confirmed = false;
		t._results = {};
		owner = t;
		return t;
	}	
	
	init(){
		var t = this;
		try{
			if(t.parent._classes === null)
				throw new Error('t.parent._classes is not defined and must be defined before functions');
			if(typeof t.conf === 'undefined')
				throw new Error('t.conf is not defined');
			if(typeof t.conf.flow === 'undefined')
				throw new Error('t.conf.flow is not defined');
			if(typeof t.conf.map === 'undefined')
				throw new Error('t.conf.map is not defined');
			if(t.conf.map.length === 0)
				throw new Error('t.conf.map array is empty');
			var fa, ob, y, z, i, fa0, fa1, cl;
			for(i = 0; i < t.conf.map.length; i++){
				if(typeof t.conf.map[i] === 'undefined')
					throw new Error('t.conf.map[' + i + '] is not defined');
				t.parent.log({"type":"info", "text": "checking function(" + t.conf.map[i] + ')', "classO":"functions.init", "file":"functions.js"});	
				fa = t.conf.map[i].split('.');
				fa0 = fa[0];
				fa1 = fa[1];
				cl = t.parent.find_class(fa0);
				if(cl === null)
					throw new Error("function(" + fa0 + ") not found");
				if(typeof cl[fa1] === 'undefined')
					throw new Error('function(' + t.conf.map[i] + ') not found');
				t.funcA.push(cl[fa1]);
			}
			t.confirmed = true;
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"functions.init", "file":"functions.js"});
			return t;

		}
	}	
}