/**
 * Flower.js: A lightweight JavaScript library
 *
 * @author henix
 */

var Flower = {version:0.1};

(function(global) {
"use strict";

#include "ecma5.js"

#include "assert.js"
global.AssertError = AssertError;
global.assert = assert;
#include "errors.js"
global.ArgumentError = ArgumentError;

#include "string.js"
global.string = string;

#include "cookie.js"
global.cookie = cookie;
global.TimeUnits = TimeUnits;

#include "csser.js"
global.csser = csser;
#include "eventer.js"
global.eventer = eventer;

#include "ajaxer.js"
global.ajaxer = ajaxer;
#include "forms.js"
global.formdata = formdata;
#include "ajaxForm.js"
global.AjaxForm = AjaxForm;

#include "detectIE.js"
global.ieVersion = detectIE;

#include "findPos.js"
global.findPos = findPos;

global.getTemplate = function (name) {
	var elem = document.querySelector('script[name=' + name + ']');
	if (!elem) {
		return null;
	}
	var text = elem.innerHTML;
	return text;
};

})(Flower);
