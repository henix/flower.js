if (document.createEvent) {
	Flower.eventer.fireEvent = function(element, eventType) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(eventType, true, true); // type, bubbling, cancelable
		return !element.dispatchEvent(evt);
	};
} else {
	Flower.eventer.fireEvent = function(element, eventType) {
		var evt = document.createEventObject();
		return element.fireEvent('on' + eventType, evt);
	};
}
