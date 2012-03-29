/**
 * refer:
 * http://www.quirksmode.org/js/cookies.html
 * http://www.w3schools.com/js/js_cookies.asp
 */

var cookie = {

	dict: {},

	/**
	 * load cookie to this object
	 */
	load: function() {
		this.dict = {};
		var ar = document.cookie.split(';');
		var len = ar.length;
		for (var i = 0; i < len; i++) {
			var eqidx = ar[i].indexOf('=');
			var name = ar[i].substring(0, eqidx).replace(/^[ ]+/, '');
			var value = decodeURIComponent(ar[i].substring(eqidx + 1));
			this.dict[name] = value;
		}
	},

	/**
	 * @param name must not have '=' or ';'
	 */
	set: function(name, value, days, path) {
		function myescape(str) {
			return str.replace(/%/g, '%25').replace(/;/g, '%3B');
		}
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		path = path || '/';
		value = value || '';
		document.cookie = name + "=" + myescape(value) + expires + "; path=" + path;
		this.dict[name] = value;
	},

	remove: function(name) {
		this.set(name, null, -1);
		delete this.dict[name];
	},

	get: function(name) {
		return this.dict[name];
	}
};
