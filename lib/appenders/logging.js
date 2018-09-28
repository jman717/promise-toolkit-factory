"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

var base = require('./base.js')
    ,StackUtils = require('stack-utils');

module.exports = class logging extends base{
	constructor(parent) {
		super(parent);
		var t = this;
		t.oname = 'logging';
		return t;
	}	
	
	init(){
		try{
			var t = this;
			t.parent._log = t;
			t.log = t.conf.log;
			t.logger = t.conf.logger;
			return t;
		}catch(e){
			console.log(e.message);						
		}
	}
	
	msg(jo){
		var t = this;
		try{
			if(typeof jo === 'undefined')
				throw new Error('jo is not defined');
			if(typeof jo.text === 'undefined')
				throw new Error('jo.text is not defined');
			if(typeof jo.type === 'undefined')
				throw new Error('jo.type is not defined');
			if(typeof jo.classO === 'undefined')
				throw new Error('jo.classO is not defined');
			if(typeof jo.file === 'undefined')
				throw new Error('jo.file is not defined');
			if(typeof t.conf === 'undefined')
				throw new Error('t.conf is not defined');
			if(typeof t.conf.log === 'undefined')
				throw new Error('t.conf.log is not defined');
			if(typeof t.conf.logger === 'undefined')
				throw new Error('t.conf.logger is not defined');
			if(jo.file === 'stack_find'){
        try{
          var stack = new StackUtils({cwd: process.cwd(),internals: StackUtils.nodeInternals()});
          var s = stack.clean(new Error().stack).split("\n");
          var sa = s[2].split("(");
          var sa2 = sa[1].split(")");
          jo.file = sa2[0];
          t.logger[jo.type](jo.text).tag(t.log.rte).tag(t.log.act).tag(t.log.file.setInput(jo.file)).tagline();
          return t;
        }catch(e){
          console.log(e.message);						
          t.logger.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tagline();			
        }
      }
			t.logger[jo.type](jo.text).tag(t.log.rte).tag(t.log.act).tag(t.log.classO.setInput(jo.classO)).tag(t.log.file.setInput(jo.file)).tagline();
			return t;
		}catch(e){
			console.log(e.message);						
			t.logger.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tagline();			
		}
	}
}