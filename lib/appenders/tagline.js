"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js')
	, StackUtils = require('stack-utils');

module.exports = class logging extends base {
	constructor(parent) {
		super(parent);
		var t = this;
		t.oname = 'tagline';
		return t;
	}

	init() {
		try {
			var t = this;
			t.parent._log = t;

			var log4js = require("log4js"),
				log4js_tagline = require("log4js-tagline")

			log4js.configure({
				appenders: { myLog: { type: 'file', filename: 'my.log' } },
				categories: { default: { appenders: ['myLog'], level: 'debug' } }
			})

			var tagline = new log4js_tagline(log4js, {
				"display": ["trace", "debug", "info", "warn", "error", "fatal", "mark"],
				"output": {
					"to_console": {
						"show": true, "color": {
							"trace": "green",
							"debug": "magenta",
							"info": "bgBlue",
							"warn": "yellow",
							"error": "red",
							"fatal": "red",
							"mark": "white"
						}
					},      /* send output to console.log */
					"to_local_file": true,   /* send output to the local file */
					"to_datadog": true        /* send output to datadog (when the datadog appender is configured) */
				}
			})

			const logger = log4js.getLogger('myLog')
			logger.level = 'debug'

			var append = tagline.appender('boolean')
			var isFalse = new append(tagline).setConfig({ "format": "bool(@boolean)" }).setFalse()
			var isTrue = new append(tagline).setConfig({ "format": "bool(@boolean)" }).setTrue()
			var display = new append(tagline).setConfig({ "format": "bool(@boolean)" }).setTrue()

			console.log('show=' + typeof display.show)
			logger.debug('show this line').tag(display.show(isTrue.getValue())).tagline()
			logger.debug('do not show this line').tag(display.show(isFalse.getValue())).tagline()

			append = tagline.appender('route')
			t.rte = new append(tagline).setConfig({ "format": "rte(@route)" }).setInput('/test')

			append = tagline.appender('line')
			t.lne = new append(tagline).setConfig({ "format": "lne(@name(): @file:@line:@column)" })

			append = tagline.appender('boolean')
			isFalse = new append(tagline).setConfig({ "format": "bool(@boolean)" }).setFalse()
			isTrue = new append(tagline).setConfig({ "format": "bool(@boolean)" }).setTrue()
			append = tagline.appender('displayLine')
			display = new append(tagline).setConfig({ "format": "display(@boolean)" })

			logger.debug('show this line').tag(display.show(isTrue.getValue())).tagline()
			logger.debug('hide this line').tag(display.show(isFalse.getValue())).tagline()

			append = tagline.appender('error')
			var err = new append(tagline)

			append = tagline.appender('class_function')
			var cfu = new append(tagline)

			append = tagline.appender('anyMsg')
			var act = new append(tagline)
			append = tagline.appender('stopwatch')
			var stw = new append(tagline)
			stw.setStart()
			logger.info('Hello World log').tag(t.rte).tag(t.lne).tagline()

			t.log = logger;
			return t;
		} catch (e) {
			console.log(e.message);
		}
	}

	msg(jo) {
		var t = this;
		try {
			if (typeof jo === 'undefined')
				throw new Error('jo is not defined');
			if (typeof jo.text === 'undefined')
				throw new Error('jo.text is not defined');
			if (typeof jo.type === 'undefined')
				throw new Error('jo.type is not defined');
			if (typeof jo.classO === 'undefined')
				throw new Error('jo.classO is not defined');
			if (typeof jo.file === 'undefined')
				throw new Error('jo.file is not defined');
			// if (typeof t.conf === 'undefined')    jrm debug
			// 	throw new Error('t.conf is not defined');
			// if (typeof t.conf.log === 'undefined')
			// 	throw new Error('t.conf.log is not defined');
			if (jo.file === 'stack_find') {
				try {
					var stack = new StackUtils({ cwd: process.cwd(), internals: StackUtils.nodeInternals() });
					var s = stack.clean(new Error().stack).split("\n");
					var sa = s[2].split("(");
					var sa2 = sa[1].split(")");
					jo.file = sa2[0];
					t.log[jo.type](jo.text).tag(t.log.rte).tag(t.log.act).tag(t.log.file.setInput(jo.file)).tagline();
					return t;
				} catch (e) {
					console.log(e.message);
					t.log.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tagline();
				}
			}
			jo.aname = 'line.js'
			t.log[jo.type](jo.text).tag(t.rte).tag(t.lne).tagline();
			return t;
		} catch (e) {
			console.log(`jrm debug 50.03 type ${jo.type}`)
			console.log(e.message);
			t.log.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tagline();
		}
	}
}