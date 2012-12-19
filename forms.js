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
