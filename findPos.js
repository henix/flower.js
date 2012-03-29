/**
 * see http://www.quirksmode.org/js/findpos.html
 */
function findPos(obj) {
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
