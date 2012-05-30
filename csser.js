var csser = {
	insertSheet: function(ruleString) {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var rules = document.createTextNode(ruleString);
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = rules.nodeValue;
		} else {
			style.appendChild(rules);
		}
		head.appendChild(style);
	},
	addClass: function(e, name) {
		if (!csser.hasClass(e, name)) {
			e.className += (' ' + name);
		}
	},
	removeClass: function(e, name) {
		e.className = e.className.replace(new RegExp('(^|\\s+)' + name + '(?=\\s|$)', 'gm'), ''); // zero-width assertion
	},
	hasClass: function(e, name) {
		/* NOTE: class names are case sensitive: http://devedge-temp.mozilla.org/viewsource/2001/css-class-id/ */
		return e.className.match(new RegExp('(^|\\s)' + name + '(\\s|$)', 'gm')) !== null;
	}
};
