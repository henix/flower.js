#ifndef DOMER_JS_
#define DOMER_JS_

var domer = {
	getText: function(node) {
		return node.textContent || node.innerText || '';
	},
	hasAttribute: function(element, name) {
		if (element.hasAttribute) {
			return element.hasAttribute(name);
		} else { // IE 6 7
			return element.getAttribute(name) !== null;
		}
	},
	viewWidth: function() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	},
	viewHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
	}
};

#endif // DOMER_JS_
