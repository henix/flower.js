var eventer = {};
if (document.body.addEventListener) {
	eventer.addEventListener = function(target, eventType, handler) {
		target.addEventListener(eventType, handler, false);
	};
	eventer.removeEventListener = function(target, eventType, handler) {
		target.removeEventListener(eventType, handler);
	};
} else {
	eventer.addEventListener = function(target, eventType, handler) {
		target.attachEvent('on' + eventType, handler);
	};
	eventer.removeEventListener = function(target, eventType, handler) {
		target.detachEvent('on' + eventType, handler);
	};
}
