/**
 * Flower.js: A lightweight JavaScript library
 *
 * @author henix
 */

var Flower = {version:0.1};

(function(global) {
"use strict";

#include "csser.js"
#include "findPos.js"
#include "eventer.js"

#include "detectIE.js"

global.csser = csser;
global.findPos = findPos;
global.eventer = eventer;

global.ieVersion = detectIE;

})(Flower);
