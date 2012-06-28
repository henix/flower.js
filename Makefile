flower-0.1.js: flower.js parseArgs.js csser.js findPos.js eventer.js ajaxer.js detectIE.js
	cpp -P -C -I "." $< > $@
