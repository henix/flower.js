/**
 * Could be:
 * * undefined: not deteced yet
 * * null: detected, not IE
 * * number: ie version
 */
Flower.ie.ieVersion = undefined;
Flower.ie.version = function() {
	if (this.ieVersion !== undefined) {
		return this.ieVersion; // cached
	}
	var v = 3;
	var div = document.createElement('div');
	var ins = div.getElementsByTagName('i');
	do {
		v++;
		div.innerHTML = '<!--[if gt IE ' + v + ']><i></i><![endif]-->';
	} while (ins[0]);
	this.ieVersion = v > 4 ? v : null;
	return this.ieVersion;
};
