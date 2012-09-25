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
			throw new AssertError(msg || 'condition is not true');
		}
	},
	present: function(obj, msg) {
		if (!obj) {
			throw new AssertError(msg || 'object null or undefined');
		}
	},
	equals: function(actuall, expected, msg) {
		if (actuall != expected) {
			if (!msg) {
				msg = actuall + ' != ' + expected + ' (expected)';
			}
			throw new AssertError(msg);
		}
	},
	notEmpty: function(str, msg) {
		if (str.length === 0) {
			throw new AssertError(msg || 'string is empty');
		}
	}
};

#endif // ASSERT_JS_
