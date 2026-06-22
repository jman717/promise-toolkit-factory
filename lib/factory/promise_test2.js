"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class jo_test2 extends base {
	constructor() {
		super();
		var t = this;
	}

	result(jo) {
		jo.resolve(`result done`);
	}

	setup(jo) {
		jo.resolve(`setup done`);
	}

	process(jo) {
		jo.resolve(`process done`);
	}

	set_init_opts(jo) {
		jo.resolve(`set_init_opts done`);
	}
}