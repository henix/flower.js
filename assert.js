#ifndef ASSERT_JS_
#define ASSERT_JS_

function AssertError(msg) {
	this.name = 'AssertError';
	this.message = msg;
}
AssertError.prototype = new Error();
AssertError.prototype.constructor = AssertError;

var assert = {
	fail: function(msg) {
		throw new AssertError(msg);
	},
	// booleans
	isTrue: function(cond, msg) {
		if (cond !== true) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('condition ' + cond + ' is not true' + msg);
		}
	},
	isFalse: function(cond, msg) {
		if (cond !== false) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('condition ' + cond + ' is not false' + msg);
		}
	},
	// null
	present: function(obj, msg) {
		if ((typeof obj === 'undefined') || (obj === null)) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('object null or undefined' + msg);
		}
	},
	notPresent: function(obj, msg) {
		if ((typeof obj !== 'undefined') && (obj !== null)) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError('object is present' + msg);
		}
	},
	// number
	equals: function(actuall, expected, msg) {
		if (actuall != expected) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError(actuall + ' != ' + expected + ' (expected)' + msg);
		}
	},
	between: function(actuall, start, end, msg) {
		if ((actuall < start) || (actuall > end)) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError(actuall + ' is not between [' + start + ',' + end + ']' + msg);
		}
	},
	// string
	equalsIgnoreCase: function(actuall, expected, msg) {
		if (actuall.toLowerCase() !== expected.toLowerCase()) {
			msg = msg ? ': ' + msg : '';
			throw new AssertError(actuall + ' !=(ignore case) ' + expected + ' (expected)' + msg);
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
