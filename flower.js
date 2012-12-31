/**
 * Flower.js: A lightweight JavaScript library
 *
 * @author henix
 */
(function() {

#inline Flower

if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = Flower;
	}
} else if (typeof define === 'function') {
	define(function () {
		return Flower;
	});
} else {
	window.Flower = Flower;
}

})();
