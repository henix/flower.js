Flower.eventer.preventDefault = function(e) {
	if (typeof e.preventDefault === 'function') {
		e.preventDefault();
		e.stopPropagation();
	} else {
		e.returnValue = false;
		e.cancelBubble = true;
	}
};
