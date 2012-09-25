var csser = {
	prependSheet: function(ruleString) {
		this.insertSheet(ruleString, true);
	},
	insertSheet: function(ruleString, atstart) {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var rules = document.createTextNode(ruleString);
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = rules.nodeValue;
		} else {
			style.appendChild(rules);
		}
		if (atstart) {
			head.insertBefore(style, head.children[0]);
		} else {
			head.appendChild(style);
		}
	},
	addClass: function(e, name) {
		if (!this.hasClass(e, name)) {
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
