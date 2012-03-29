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
