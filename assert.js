#ifndef ASSERT_JS_
#define ASSERT_JS_

function AssertError(msg) {
	this.name = 'AssertError';
	this.message = msg;
}
AssertError.prototype = new Error();
AssertError.prototype.constructor = AssertError;

var assert = {
	isTrue: function(cond, msg) {
		if (cond !== true) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('condition ' + cond + ' is not true: ' + msg);
		}
	},
	isFalse: function(cond, msg) {
		if (cond !== false) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('condition ' + cond + ' is not false: ' + msg);
		}
	},
	present: function(obj, msg) {
		if (!obj) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('object null or undefined: ' + msg);
		}
	},
	notPresent: function(obj, msg) {
		if (obj) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('object is present: ' + msg);
		}
	},
	equals: function(actuall, expected, msg) {
		if (actuall != expected) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError(actuall + ' != ' + expected + ' (expected)' + msg);
		}
	},
	notEmpty: function(str, msg) {
		if (str.length === 0) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('string is empty' + msg);
		}
	}
};

#endif // ASSERT_JS_
