Flower.domer = {
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
	offset: function (obj) {
		if (typeof obj.getBoundingClientRect !== "undefined") {
			// https://github.com/jquery/jquery/blob/master/src/offset.js
			var rect = obj.getBoundingClientRect();
			var docElem = document.documentElement;
			return {
				left: rect.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
				top: rect.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0)
			};
		} else {
			// http://www.quirksmode.org/js/findpos.html
			var curleft = 0;
			var curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
					obj = obj.offsetParent;
				} while(obj);
			}
			return {'left':curleft,'top':curtop};
		}
	},
	viewWidth: function() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	},
	viewHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
	}
};
