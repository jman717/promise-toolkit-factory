"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class jo_test1 extends base {
	constructor() {
		super();
		var t = this;
	}

	init(jo) {
		var t = this
		try {
			jo.parent.log({ "type": "debug", "text": `message from init 101`, "classO": "jo_test1.do_this", "file": "jo_test1.js" });
			jo.resolve(`jo resolved init`);
		} catch (e) {
			jo.reject(`jo_test1.init error: ${e.message}`)
			throw e;
		}
		jo.reject(`init error: process failed`)
	}

	step1(jo) {
		jo.some_var = "use this";
		//jo.skip_to_flow = 4;
		jo.resolve(`step2 done`);
	}

	step2(jo) {
		jo.parent.log({ "type": "debug", "text": "message from step1(" + jo.some_var + ")", "classO": "jo_test1.step2", "file": "jo_test1.js" });
		jo.resolve(`step2 done`);
	}

	step4(jo) {
		jo.resolve(`step4 done`);
	}

	step5(jo) {
		jo.resolve(`step5 done`);
	}

	do_this(jo) {
		var g = jo.parent.getVars({ "vars": "globals" });
		try {
			jo.parent.log({ "type": "debug", "text": `message from do_this(${JSON.stringify(g)})`, "classO": "jo_test1.do_this", "file": "jo_test1.js" });
			jo.resolve(`jo resolved`);
		} catch (e) {
			jo.reject(`jo_test1 error: ${e.message}`)
		}
		jo.reject(`jo_test1 error: process failed`)
	}

	finish(jo) {
		jo.resolve(`finish done`);
	}
}