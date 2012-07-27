#ifndef ARRAY_JS_
#define ARRAY_JS_

var array = {
	contains: function(ar, v) {
		var len = ar.length;
		for (var i = 0; i < len; i++) {
			if (ar[i] === v) {
				return true;
			}
		}
		return false;
	},
	map: function(ar, mapFunc) {
		var ret = [];
		var len = ar.length;
		for (var i = 0; i < len; i++) {
			ret.push(mapFunc(i, ar[i]));
		}
		return ret;
	},
	foreach: function(ar, func) {
		var len = ar.length;
		for (var i = 0; i < len; i++) {
			func(i, ar[i]);
		}
	}
};

#endif // ARRAY_JS_
