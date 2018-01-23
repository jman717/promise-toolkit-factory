
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/

const ptf = require("promise-toolkit-factory");

var f1 = require('./lib/factory/promise_test1')
		,f2 = require('./lib/factory/promise_test2');

var f1o = new f1()
		,f2o = new f2();

var toolkit = new ptf().appender('vars', {"globals": {"any":"values"}})
	.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}, {"name": "f2o", "obj": f2o}]})
	.appender('functions', {"flow": 1, "map": ["f1o.init", "f2o.process", "f1o.step1", "f1o.step4", "f2o.set_init_opts"]})
	.appender('functions', {"flow": 2, "map": ["f1o.init", "f1o.step2", "f1o.step5"]})
	.appender('functions', {"flow": 3, "map": ["f1o.init", "f1o.finish"]})
	.appender('functions', {"flow": 4, "map": ["f1o.init", "f1o.do_this"]})
	.appender('promises', {"flows":[1, 2, 3]})
	.appender('promises', {"flows":[4]})
	.run();

console.log("test complete");