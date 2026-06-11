"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class promise_test2 extends base {
	constructor() {
		super();
		var t = this;
	}

	result(promise) {
		promise.resolve(`result done`);
	}

	setup(promise) {
		promise.resolve(`setup done`);
	}

	process(promise) {
		promise.resolve(`process done`);
	}

	set_init_opts(promise) {
		promise.resolve(`set_init_opts done`);
	}
}