"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js');

module.exports = class vars extends base{
	constructor(parent) {
		super(parent);
		var t = this;
		t.oname = 'vars';
		return t;
	}	
	
	init(){
		var t = this;
		try{
			if(typeof t.conf === 'undefined')
				throw new Error('t.conf is not defined');
			return t;
		}catch(e){
			t.parent.log({"type":"error", "text": "error: " + e.message, "classO":"exports.init", "file":"vars.js"});
		}
	}
}