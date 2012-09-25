#ifndef ERRORS_JS_
#define ERRORS_JS_

/**
 * like IllegalArgumentException
 * Indicates some user input is bad
 */
function ArgumentError(message) {
	this.name = 'ArgumentError';
	this.message = message;
}
ArgumentError.prototype = new Error();
ArgumentError.prototype.constructor = ArgumentError;

#endif // ERRORS_JS_
