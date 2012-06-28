/**
 * Flower.js: A lightweight JavaScript library
 *
 * @author henix
 */

var Flower = {version:0.1};

(function(global) {
"use strict";

#include "parseArgs.js"

#include "csser.js"
#include "findPos.js"
#include "eventer.js"
#include "ajaxer.js"

#include "detectIE.js"

global.parseArgs = parseArgs;

global.csser = csser;
global.findPos = findPos;
global.eventer = eventer;
global.ajaxer = ajaxer;

global.ieVersion = detectIE;

})(Flower);
