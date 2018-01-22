"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

module.exports = class base{
	constructor(parent) {
		var t = this;
		t.conf = {};
		t.parent = parent;
	}	
	
	config(jo){
		var t = this;
		t.conf = jo;
		return t;		
	}
	
	getOname(){
		return this.oname;
	}
}