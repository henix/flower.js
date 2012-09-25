#ifndef EVENTER_JS_
#define EVENTER_JS_

var eventer = {
	preventDefault: function(e) {
		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.returnValue = false;
			e.cancelBubble = true;
		}
	}
};

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

if (document.createEvent) {
	eventer.fireEvent = function(element, eventType) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(eventType, true, true); // type, bubbling, cancelable
		return !element.dispatchEvent(evt);
	};
} else {
	eventer.fireEvent = function(element, eventType) {
		var evt = document.createEventObject();
		return element.fireEvent('on' + eventType, evt);
	};
}

#endif // EVENTER_JS_
