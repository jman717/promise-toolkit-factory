"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class promise_test1 extends base {
	constructor() {
		super();
		var t = this;
	}

	init(promise) {
		var t = this
		try {
			promise.resolve(`promise resolved`);
		} catch (e) {
			promise.reject(`promise_test1.init error: ${e.message}`)
			throw e;
		}
		promise.reject(`init error: process failed`)
	}

	step1(promise) {
		promise.some_var = "use this";
		//promise.skip_to_flow = 4;
		promise.resolve(`step2 done`);
	}

	step2(promise) {
		promise.parent.log({ "type": "debug", "text": "message from step1(" + promise.some_var + ")", "classO": "promise_test1.step2", "file": "promise_test1.js" });
		promise.resolve(`step2 done`);
	}

	step4(promise) {
		promise.resolve(`step4 done`);
	}

	step5(promise) {
		promise.resolve(`step5 done`);
	}

	do_this(promise) {
		var g = promise.parent.getVars({ "vars": "globals" });
		try {
			promise.resolve(`promise resolved`);
		} catch (e) {
			promise.reject(`promise_test1 error: ${e.message}`)
		}
		promise.reject(`promise_test1 error: process failed`)
	}

	finish(promise) {
		promise.resolve(`finish done`);
	}
}