var string = {
	/* see http://stackoverflow.com/questions/646628/javascript-startswith */
	/* benchmark: http://jsperf.com/js-startswith/6 */
	startsWith: function(str, prefix) {
		return str.lastIndexOf(prefix, 0) === 0;
	},
	endsWith: function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
};