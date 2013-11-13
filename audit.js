/*!
* basic-audit-trail
* Copyright (c) 2013 Leonard Wu <leonard.wu92@imperial.ac.uk>
* MIT Licensed
*/

var _ = require('underscore'),
	winston = require('winston');

//enable daily rotation of log file
winston.add(winston.transports.DailyRotateFile, {
  filename: './log/audit.log',
  datePattern: '.yyyy-MM-dd'
});
// disable log to stdout
winston.remove(winston.transports.Console);

function intercept(callbk, successMsg, scope) {
	return function(){
		var err = arguments[0];
		if (err) {
			winston.error(err);
		} else {
			winston.info(_.isObject(successMsg)? JSON.stringify(successMsg) : successMsg);
		}
		if (_.isFunction(callbk)) {
			callbk.apply(scope || this, arguments);
		}
	};
}

exports.intercept = intercept;
exports.error = winston.error;
exports.info = winston.info;
