"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/

module.exports = class promise_toolkit_factory {
	constructor(jo) {
		var t = this;
		t.appenders_dir = './lib/appenders/';
		t.appenders = [];
		t._log = null;
		return t;
	}

	appender(name, conf) {
		var t = this;
		try {
			if (typeof eval('t.' + name) === 'undefined') {
				var a = t.appenders_dir + name + '.js';
				var x = require(a);
				t.appenders.push(new x(t).config(conf).init())
				t.log({ "type": "trace", "text": "file loading=" + a, "classO": "promise_toolkit_factory.appender", "file": "app.js" });
			}
			return t;
		} catch (e) {
			console.log('appenders error: ' + e.message)
		}
	}

	log(jo) {
		try {
			var t = this;
			if (t._log !== null) {
				t._log.msg(jo);
			} else {
				if (typeof jo !== 'undefined' && typeof jo.text !== 'undefined')
					console.log('logger is undefined. Message: ' + jo.text);
			}
		} catch (e) {
			console.log('app.js log error: ' + e.message);
		}
	}

	run() {
		var t = this;
		var a = t.appenders, z;
		try {
			t.log({ "type": "trace", "text": `run() count(${a.length})`, "classO": "promise_toolkit_factory.run", "file": "app.js" });
			for (z = 0; z < a.length; z++)
				if (a[z].oname === 'promises')
					a[z].run();
			return t;
		} catch (e) {
			t.log({ "type": "error", "text": "error: " + e.message, "classO": "promise_toolkit_factory.run", "file": "app.js" });
		}
	}

	getFlowAppender(jo) {
		var t = this;
		var a = t.appenders, z;
		try {
			if (typeof jo.flow === 'undefined')
				throw new Error('jo.flow is undefined');
			t.log({ "type": "trace", "text": "getFlowAppender", "classO": "promise_toolkit_factory.getFlowAppender", "file": "app.js" });
			for (z = 0; z < a.length; z++)
				if (a[z].oname === 'functions')
					if (a[z].conf.flow === jo.flow)
						return a[z];
			throw new Error("cannot find flow(" + jo.flow + ").");
		} catch (e) {
			t.log({ "type": "info", "text": "error: " + e.message, "classO": "promise_toolkit_factory.getFlow", "file": "app.js" })
			throw e
		}
	}

	find_function(f) {
		var t = this;
		var a = t.appenders, z, q
		try {
			t.log({ "type": "trace", "text": `find_function=${f}`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
			for (z = 0; z < a.length; z++) {
				if (a[z].oname === 'functions') {
					t.log({ "type": "trace", "text": `find_function 101 ${f} length(${a[z].conf.map.length})`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
					for (q = 0; q < a[z].conf.map.length; q++) {
						t.log({ "type": "trace", "text": `find_function map ${a[z].conf.map[q]}=${f}`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
						if (a[z].conf.map[q] == f) {
							t.log({ "type": "trace", "text": `find_function map 101 ${a[z].funcA.length}`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
							return a[z].funcA[q]
						}
					}
				}
			}
			throw new Error(`cannot find function(${f})`)
		} catch (e) {
			t.log({ "type": "info", "text": "error: " + e.message, "classO": "promise_toolkit_factory.find_function", "file": "app.js" })
			throw e
		}
	}

	return_shift_function(f) {
		var t = this;
		var a = t.appenders, z, q
		try {
			t.log({ "type": "trace", "text": `find_function=${f}`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
			for (z = 0; z < a.length; z++) {
				if (a[z].oname === 'functions') {
					t.log({ "type": "trace", "text": `find_function 101 ${f} length(${a[z].conf.map.length})`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
					for (q = 0; q < a[z].conf.map.length; q++) {
						// t.log({ "type": "trace", "text": `find_function map ${a[z].conf.map[q]}=${f} length(${a[z].conf.map.length})`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
						if (a[z].conf.map[q] == f) {
							t.log({ "type": "trace", "text": `find_function map 101 ${a[z].funcA.length} q(${q})`, "classO": "promise_toolkit_factory.find_function", "file": "app.js" });
							a[z].conf.map.shift()
							return a[z].funcA.shift()
						}
					}
				}
			}
			throw new Error(`cannot find function(${f})`)
		} catch (e) {
			t.log({ "type": "info", "text": "error: " + e.message, "classO": "promise_toolkit_factory.find_function", "file": "app.js" })
			throw e
		}
	}

	getVars(jo) {
		var t = this
		var a = t.appenders, z
		try {
			if (typeof jo === 'undefined')
				throw new Error('jo is undefined');
			if (typeof jo.vars === 'undefined')
				throw new Error('jo.vars is undefined');
			for (z = 0; z < a.length; z++) {
				if (a[z].oname === 'vars')
					if (typeof a[z].conf[jo.vars] !== 'undefined')
						return a[z].conf[jo.vars];
			}
			throw new Error("cannot find vars(" + jo.vars + ").");
		} catch (e) {
			t.log({ "type": "error", "text": "error: " + e.message, "classO": "promise_toolkit_factory.getFlow", "file": "app.js" });
		}
	}

	setVars(jo) {
		var t = this
		var a = t.appenders, z
		try {
			if (typeof jo === 'undefined')
				throw new Error('jo is undefined');
			if (typeof jo.vars === 'undefined')
				throw new Error('jo.vars is undefined');
			for (z = 0; z < a.length; z++) {
				if (a[z].oname === 'vars')
					if (typeof a[z].conf[jo.vars] !== 'undefined')
						a[z].conf[jo.vars] = jo
			}
			throw new Error("cannot find vars(" + jo.vars + ").");
		} catch (e) {
			t.log({ "type": "error", "text": "error: " + e.message, "classO": "promise_toolkit_factory.getFlow", "file": "app.js" });
		}
	}

	find_class(s) {
		var t = this;
		var z, y, a = t.appenders, ob, fa0, fa1, fa
		try {
			fa = s.split('.');
			fa0 = fa[0];
			fa1 = fa[1];

			t.log({ "type": "trace", "text": "looking for class(" + fa0 + ')', "classO": "promise_toolkit_factory.find_class", "file": "app.js" });
			for (z = 0; z < a.length; z++) {
				if (a[z].oname === 'classes') {
					ob = a[z].conf.objs;
					for (y = 0; y < ob.length; y++) {
						if (fa0 === ob[y].name) {
							t.log({ "type": "debug", "text": `function confirmed(${fa0})=(${ob[y].name}) obj(${JSON.stringify(ob[y].obj)})`, "classO": "functions.init", "file": "functions.js" });
							return ob[y].obj;
						}
					}
				}
			}
			return null;
		} catch (e) {
			t.log({ "type": "error", "text": "error: " + e.message, "classO": "promise_toolkit_factory.find_class", "file": "app.js" });
		}
	}
}
