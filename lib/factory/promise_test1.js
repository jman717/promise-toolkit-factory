"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class promise_test1 extends base{
	constructor() {
		super();
		var t = this;
	}
	
	init(results){
		var t = this;
		results.parent.log({"type":"debug", "text": "debug 10.00", "classO":"promise_test1.init", "file":"promise_test1.js"});
		try{
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"promise_test1.init", "file":"promise_test1.js"});
			throw e;
		}
	}
	
	step1(results){
		results.some_var = "use this";
		//results.skip_to_flow = 4;
		return results;
	}
	 
	step2(results){
		results.parent.log({"type":"debug", "text": "message from step1(" + results.some_var + ")", "classO":"promise_test1.step2", "file":"promise_test1.js"});
		return results;
	}
	
	step4(results){
		return results;
	}
	
	step5(results){
		return results;
	}
	
	do_this(results){
		var g = results.parent.getVars({"vars":"globals"});
		try{
			g.res.json({"results":"success"})
		}catch(e){
			console.log('{"results":"success"}');
		}
		return results;
	}
	
	finish(results){
		return results;
	}
}