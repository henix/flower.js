#ifndef AJAXER_JS_
#define AJAXER_JS_

#include "assert.js"

var ajaxer = {
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
		assert.present(url);
		assert.present(onsuccess);

		var req = ajaxer.newXhr();
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
		assert.present(url);
		assert.present(onsuccess);

		var req = ajaxer.newXhr();
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

#endif // AJAXER_JS_
