/**
 * if there are multiple key=value, return the first one
 *
 * @param data: string
 * @param names: array of string
 */
function parseArgs(data, names) {
	var dict = {};
	for (var i = names.length - 1; i >= 0; i--){
		dict[names[i]] = true;
	}
	var ret = {};
	var start = 0;
	var end;
	var key;
	while (start < data.length) {
		end = data.indexOf('&', start);
		if (end == -1) {
			end = data.length;
		}
		var eq = data.indexOf('=', start);
		if (eq < end) {
			key = decodeURIComponent(data.substring(start, eq));
			if (dict[key] && !ret[key]) {
				ret[key] = decodeURIComponent(data.substring(eq + 1, end));
			}
		}
		start = end + 1;
	}
	return ret;
}
