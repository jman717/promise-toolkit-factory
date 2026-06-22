"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js');

var owner;
module.exports = class promises extends base {
	constructor(parent) {
		super(parent)
		var t = this
		t.oname = 'promises'
		owner = t
		t.results = { "owner": owner, "parent": t.parent, "flow": 0 }
		t.data = null
		t.pjo = null
		t._promise_queue = []
		t.appender = null
		return t;
	}

	init() {
		var t = this;
		try {
			if (typeof t.conf === 'undefined')
				throw new Error('t.conf is not defined');
			if (typeof t.conf.flows === 'undefined')
				throw new Error('t.conf.flows is not defined');
			if (t.conf.flows.length === 0)
				throw new Error('t.conf.flows array is empty');
			return t;
		} catch (e) {
			t.parent.log({ "type": "error", "text": "error: " + e.message, "classO": "promises.init", "file": "promises.js" });
		}
	}

	run() {
		var t = owner, flw, fnc, i, z, fname

		try {
			if (t.conf.flows.length > 0) {
				for (i = 0; i < t.conf.flows.length; i++) {
					flw = t.conf.flows[i]
					t.appender = t.parent.getFlowAppender({ "flow": flw })
					if (t.appender.conf.map.length === 0) {
						t.conf.flows.shift()
						t.run()
					}
					for (z = 0; z < t.appender.conf.map.length; z++) {
						fname = t.appender.conf.map[z]
						fnc = t.parent.return_shift_function(t.appender.conf.map[z])
						t.promise_queue(fnc, fname)
						break
					}
					break
				}
			} else {
				t.parent.log({ "type": "info", "text": `done with run`, "classO": "promises.regular", "file": "promises.js" })
			}
		} catch (e) {
			t.parent.log({ "type": "info", "text": `trying run until done`, "classO": "promises.regular", "file": "promises.js" })
			return
		}
	}

	promise_queue(funcX, fname) {
		var t = owner, jo = {}
		try {
			if (typeof funcX == `function`) {
				new Promise((resolve, reject) => {
					jo.resolve = resolve
					jo.reject = reject
					jo.parent = t.parent
					funcX(jo)
				}).then(data => {
					t.parent.log({ "type": "debug", "text": `process flow3=${data}`, "classO": "promises.process", "file": "promises.js" });
					if (t.conf.flows.length > 0) {
						t.run()
					}
				}, reject => {
					t.parent.log({ "type": "error", "text": "reject(" + reject + ")", "classO": "promises.run", "file": "promises.js" });
					jo.reject(reject);
				})
			}
		} catch (e) {
			t.parent.log({ "type": "error", "text": "error: " + e.message, "classO": "promises.process", "file": "promises.js" });
		}
	}
}
