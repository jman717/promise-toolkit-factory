
Under a promise structure, map functions to create flows free from callbacks; the factory class objects are then lightweight decoupled objects for any new micro-service arrangement.

Included appenders:

* classes - Create one or as many class appender as necessary to run function flows.
* functions - Create your map of functions and how you wish to form a flow.
* promises - How do you wish your flows to execute. Create as many or as few flows as necessary to run any micro-service.
* vars - Define variables which can be used throughout all your functions in all your classes.
* logging - Log4js-tagline is another one of my packages and I use it in the samples below. If you have a preference for another logging package the logging appender can be modified to suite your needs.

Installation
---------
```
npm install log4js
npm install log4js-tagline
npm install promise-toolkit-factory

```

Functions in the factory follow this format:

```javascript
class exampleC{
	func1(json_object){
			//code goes here
			json_object.resolve(json_object);
		});
	}

	func2(json_object){
		//code goes here
		json_object.resolve(json_object);
	}

	func3(json_object){
		//code goes here
		json_object.reject('some error message');
	}
}
```

The following example would have this setup:

```javascript
var exC = new exampleC();

....
	.appender('classes', {"objs": [{"name": "c1", "obj": exC}])
	.appender('functions', {"flow": 1, "map": ["c1.func1", "c1.func2", "c1.func3"]})
....
```

Values can be passed from one function, or to all functions in any particular flow, as:

```javascript
class exampleC{
	func1(json_object){
		json_object.new_value = 4;
		json_object.resolve(json_object);
	}

	func2(json_object){
		if(json_object.new_value > 3)
			throw new Error('got an error');
		json_object.resolve(json_object);
	}
}
```

The error will throw back to the latest promise which will catch and return a reject for that promise.

## Usage Sample 1

This defines 2 class objects and 4 function flows. Each flow is done in sequence, with a json object passed to each subsequence function. A fork can simply be values passed to the appropriate flow.

```js
var log4js = require("log4js")
		,log4js_tagline = require("log4js-tagline");
		,ptf = require('promise-toolkit-factory');

		mp = t.getMainParams(req, res);
		var f1 = require(t.factory_dir + '/promise_test1');
		var f2 = require(t.factory_dir + '/promise_test2');
		var f1o = new f1();
		var f2o = new f2();
		var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
			.appender('vars', {"globals": mp, "local": {"total": 0}})
			.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}, {"name": "f2o", "obj": f2o}]})
			.appender('functions', {"flow": 1, "map": ["f1o.init", "f2o.process", "f1o.step1", "f1o.step4", "f2o.set_init_opts"]})
			.appender('functions', {"flow": 2, "map": ["f1o.init", "f1o.step2", "f1o.step5"]})
			.appender('functions', {"flow": 3, "map": ["f1o.init", "f1o.finish"]})
			.appender('functions', {"flow": 4, "map": ["f1o.init", "f1o.do_this"]})
			.appender('promises', {"flows":[1, 2, 3]})
			.appender('promises', {"flows":[4]})
			.run();
```		

With multiple flows, skip_to_flow bypasses any further processing to go directly to the indicated flow. 

```js
class exampleC{
	func1(json_object){
		var g = json_object.parent.getVars({"vars":"globals"})
			,loc = json_object.parent.getVars({"vars":"local"});
		loc.total = 4;
		json_object.resolve(json_object);
	}

	func2(json_object){
		var g = json_object.parent.getVars({"vars":"globals"})
			,loc = json_object.parent.getVars({"vars":"local"});
		if(loc.total > 3)
			json_object.skip_to_flow = 2;
		json_object.resolve(json_object);
	}
}
```		

The error will throw back to the latest promise which will catch and return a reject for that promise.
		

## Usage Sample 2

This defines 2 class objects and 4 function flows from above but no file logging is defined. 

```js

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

```		
