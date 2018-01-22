"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js')

module.exports = class classes extends base{
	constructor(parent) {
		super(parent);
		var t = this;
		t.oname = 'classes';
		return t;
	}	
	
	init(){
		var t = this;
		try{
			if(typeof t.conf === 'undefined')
				throw new Error('t.conf is not defined');
			if(typeof t.conf.objs === 'undefined')
				throw new Error('t.conf.objs is not defined');
			if(typeof t.conf.objs === 'undefined')
				throw new Error('t.conf.objs is not defined');
			if(t.conf.objs.length === 0)
				throw new Error('t.conf.objs array is empty');
			for(var i = 0; i < t.conf.objs.length; i++){
				if(typeof t.conf.objs[i].name === 'undefined')
					throw new Error('t.conf.objs[' + i + '].name is not defined');
				if(typeof t.conf.objs[i].obj === 'undefined')
					throw new Error('t.conf.objs[' + i + '].obj is not defined');
				t.parent.log({"type":"info", "text": "checking class(" + t.conf.objs[i].name + ') typeof(' + typeof eval(t.conf.objs[i].obj) + ')', "classO":"classes.init", "file":"classes.js"});			
			}
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"classes.check", "file":"classes.js"});
		}
	}
}
