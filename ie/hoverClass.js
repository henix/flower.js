/**
 * For IE6 doesn't support :hover on any element
 */
Flower.ie.hoverClass = function(elem, className) {
	Assert.present(elem, 'missing elem in ie.hoverClass()');
	Assert.present(className, 'missing className in ie.hoverClass()');

	Flower.eventer.addEventListener(elem, 'mouseenter', function() {
		Flower.csser.addClass(elem, className);
	});

	Flower.eventer.addEventListener(elem, 'mouseleave', function() {
		Flower.csser.removeClass(elem, className);
	});
};
