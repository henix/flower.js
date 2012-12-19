/**
 * Flower.js: A lightweight JavaScript library
 *
 * @author henix
 */
var Flower = { _version: '0.1' };
Flower.string = {
	/* see http://stackoverflow.com/questions/646628/javascript-startswith */
	/* benchmark: http://jsperf.com/js-startswith/6 */
	startsWith: function(str, prefix) {
		return str.lastIndexOf(prefix, 0) === 0;
	},
	endsWith: function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	},
	removeEnd: function(str, suffix) {
		if (this.endsWith(str, suffix)) {
			return str.substring(0, str.length - suffix.length);
		}
		return str;
	}
};
(function() {

var detectIE = function() {
	if (detectIE.ieVersion !== undefined) {
		return detectIE.ieVersion; // cached
	}
	var v = 3;
	var div = document.createElement('div');
	var ins = div.getElementsByTagName('i');

	do {
		v++;
		div.innerHTML = '<!--[if gt IE ' + v + ']><i></i><![endif]-->';
	} while(ins[0]);
	detectIE.ieVersion = v > 4 ? v : null;
	return detectIE.ieVersion;
};

Flower.ieVersion = detectIE;

})();
(function() {

var TimeUnit = {};
TimeUnit.MILLISECONDS = 1;
TimeUnit.SECONDS = 1000 * TimeUnit.MILLISECONDS;
TimeUnit.MINUTES = 60 * TimeUnit.SECONDS;
TimeUnit.HOURS = 60 * TimeUnit.MINUTES;
TimeUnit.DAYS = 24 * TimeUnit.HOURS;

Flower.TimeUnit = TimeUnit;

})();
function AssertError(msg) {
	this.name = 'AssertError';
	this.message = msg;
}
AssertError.prototype = new Error();
AssertError.prototype.constructor = AssertError;

Assert = {
	fail: function(msg) {
		throw new AssertError(msg);
	}
};
Assert.present = function(obj, msg) {
	if ((typeof obj === 'undefined') || (obj === null)) {
		msg = msg ? ': ' + msg : '';
		Assert.fail('object null or undefined' + msg);
	}
};
Flower.ajaxer = {
	newXhr: function() {
		var msxml_progid = ['MSXML2.XMLHTTP.6.0', 'MSXML3.XMLHTTP',
		'Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0']; // not support readyState 3

		var req;
		try {
			req = new XMLHttpRequest();
		} catch(e) {
			for (var i = 0, len = msxml_progid.length; i < len; ++i) {
				try {
					req = new ActiveXObject(msxml_progid[i]);
					break;
				} catch(e2) {}
			}
		} finally {
			return req;
		}
	},
	get: function(url, onsuccess, onerror, async) {
		Assert.present(url);
		Assert.present(onsuccess);

		var req = this.newXhr();
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				if (req.status == 200) {
					onsuccess(req.responseText);
				} else {
					if (onerror) {
						onerror(req.status, req.responseText);
					}
				}
			}
		};
		if (async === true || async === false) {
			req.open('GET', url, async);
		} else {
			req.open('GET', url);
		}
		req.send();
	},
	post: function(url, data, onsuccess, onerror, async) {
		Assert.present(url);
		Assert.present(onsuccess);

		var req = this.newXhr();
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				if (req.status == 200) {
					onsuccess(req.responseText);
				} else {
					if (onerror) {
						onerror(req.status, req.responseText);
					}
				}
			}
		};
		if (async === true || async === false) {
			req.open('POST', url, async);
		} else {
			req.open('POST', url);
		}
		req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		req.send(data);
	}
};
Flower.csser = {
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
Flower.eventer = {};
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
Flower.eventer.preventDefault = function(e) {
	if (typeof e.preventDefault === 'function') {
		e.preventDefault();
		e.stopPropagation();
	} else {
		e.returnValue = false;
		e.cancelBubble = true;
	}
};
/**
 * String.trim()
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim
 */
if(!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	};
}
/**
 * Object.keys
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
        ],
        dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

			var result = [];

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) result.push(prop);
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
				}
			}
			return result;
		};
	})();
}
Flower.formdata = {
	newValue: function() {
		return {};
	},
	add: function(v, key, value) {
		if (v.hasOwnProperty(key)) {
			v[key].push(value);
		} else {
			v[key] = [value];
		}
	},
	del: function(v, key) {
		delete v[key];
	},
	get: function(v, key) {
		if (v.hasOwnProperty(key)) {
			return v[key][0];
		}
		return null;
	},
	set: function(v, key, value) {
		v[key] = [value];
	},
	encode: function(v) {
		var ret = [];
		var keys = Object.keys(v);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			for (var j = 0; j < v[key].length; j++) {
				ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(v[key][j]));
			}
		}
		return ret.join('&');
	},
	parse: function(data, names) {
		var valid = {};
		for (var i = 0; i < names.length; i++) {
			valid[names[i]] = true;
		}
		var ret = this.newValue();
		var start = 0;
		var end;
		while (start < data.length) {
			end = data.indexOf('&', start);
			if (end == -1) {
				end = data.length;
			}
			var section = data.substring(start, end);
			var sep = section.indexOf('=');
			if (sep != -1) {
				var key = decodeURIComponent(section.substring(0, sep).trim());
				if (valid[key]) {
					var value = decodeURIComponent(section.substring(sep + 1).trim());
					this.add(ret, key, value);
				}
			}
			start = end + 1;
		}
		return ret;
	}
};
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
(function() {

function AjaxForm(form, onsuccess, onerror) {
	Assert.present(form);
	Assert.present(onsuccess);
	this.form = form;
	this.onsuccess = onsuccess;
	this.onerror = onerror;
}

AjaxForm.prototype.submit = function() {
	var formdata = Flower.formdata;
	// get values
	var values = formdata.newValue();
	do {
		var inputs = this.form.elements;
		for (var i = 0; i < inputs.length; i++) {
			var e = inputs[i];
			switch (e.type.toLowerCase()) {
				case 'text':
				case 'hidden':
					if (e.name) {
						formdata.add(values, e.name, e.value);
					}
					break;
				case 'checkbox':
				case 'radio':
					if (e.name && e.checked) {
						formdata.add(values, e.name, e.value);
					}
					break;
				default:
					break;
			}
		}
	} while(false);

	var action = this.form.action;
	var method = this.form.method.toLowerCase();

	if (method === 'get') {
		Flower.ajaxer.get(action + '?' + formdata.encode(values), this.onsuccess, this.onerror);
	} else if (method === 'post') {
		Flower.ajaxer.post(action, formdata.encode(values), this.onsuccess, this.onerror);
	} else {
		Assert.fail("Unknown action of form: " + action);
	}
};

Flower.AjaxForm = AjaxForm;

})();
Assert.isTrue = function(cond, msg) {
	if (cond !== true) {
		msg = msg ? ': ' + msg : '';
		Assert.fail('condition ' + cond + ' is not true' + msg);
	}
};
/**
 * refer:
 * http://www.quirksmode.org/js/cookies.html
 * http://www.w3schools.com/js/js_cookies.asp
 */

(function () {

Flower.cookie = {
	dict: null,

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
	set: function(name, value, ms, path) {
		Assert.present(name);
		Assert.isTrue(name.indexOf('=') === -1, 'name must not contains "="');
		Assert.isTrue(name.indexOf(';') === -1, 'name must not contains ";"');

		function myescape(str) {
			return str.replace(/%/g, '%25').replace(/;/g, '%3B');
		}
		var expires;
		if (ms) {
			var date = new Date();
			date.setTime(date.getTime() + ms);
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

})();
