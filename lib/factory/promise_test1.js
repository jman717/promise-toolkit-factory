"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class do_this extends base {
	constructor() {
		super();
		var t = this;
	}

	init(jo) {
		var t = this
		try {
			jo.parent.log({ "type": "debug", "text": `message from init 101`, "classO": "do_this.do_this", "file": "do_this.js" });
			jo.resolve(`jo resolved init`);
		} catch (e) {
			jo.reject(`do_this.init error: ${e.message}`)
			throw e;
		}
		jo.reject(`init error: process failed`)
	}

	step1(jo) {
		jo.some_var = "use this"
		var g = jo.parent.getVars({ "vars": "globals" })

		g.add_new_variable = "new value"
		jo.parent.setVars({ "vars": {"globals": g }})
		jo.resolve(`step1 done`);
	}

	step2(jo) {
		var g = jo.parent.getVars({ "vars": "globals" })
		jo.parent.log({ "type": "debug", "text": `global message from step1(${JSON.stringify(g)})`, "classO": "do_this.step2", "file": "do_this.js" });
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
			jo.parent.log({ "type": "debug", "text": `message from do_this(${JSON.stringify(g)})`, "classO": "do_this.do_this", "file": "do_this.js" });
			jo.resolve(`jo resolved`);
		} catch (e) {
			jo.reject(`do_this error: ${e.message}`)
		}
		jo.reject(`do_this error: process failed`)
	}

	finish(jo) {
		jo.resolve(`finish done`);
	}
}