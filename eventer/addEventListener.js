if (document.body.addEventListener) {
	Flower.eventer.addEventListener = function(target, eventType, handler) {
		target.addEventListener(eventType, handler, false);
	};
	Flower.eventer.removeEventListener = function(target, eventType, handler) {
		target.removeEventListener(eventType, handler);
	};
} else {
	Flower.eventer.addEventListener = function(target, eventType, handler) {
		target.attachEvent('on' + eventType, handler);
	};
	Flower.eventer.removeEventListener = function(target, eventType, handler) {
		target.detachEvent('on' + eventType, handler);
	};
}
