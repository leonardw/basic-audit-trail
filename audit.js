/*!
* basic-audit-trail
* Copyright (c) 2013 Leonard Wu <leonard.wu92@imperial.ac.uk>
* MIT Licensed
*/

var _ = require('lodash'),
	winston = require('winston');

function filename(f) {
	var fname = f || './audit.log';
	console.info('Audit filename set to ' + fname);
	//enable daily rotation of log file
	winston.add(winston.transports.DailyRotateFile, {
		filename: fname,
		datePattern: '.yyyy-MM-dd'
	});
	// disable log to stdout
	winston.remove(winston.transports.Console);
}

function audit(logFn, msg) {
	logFn(_.isObject(msg)? JSON.stringify(msg) : msg);
}

function error(msg) {
	audit(winston.error, msg);
}

function info(msg) {
	audit(winston.info, msg);
}

function intercept(callbk, successMsg, scope) {
	return function(){
		var err = arguments[0];
		if (err) {
			error(err);
		} else {
			info(_.isObject(successMsg)? JSON.stringify(successMsg) : successMsg);
		}
		if (_.isFunction(callbk)) {
			callbk.apply(scope || this, arguments);
		}
	};
}

exports.filename = filename;
exports.intercept = intercept;
exports.error = error;
exports.info = info;
