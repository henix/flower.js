flower-0.1.js: flower.js
	cpp -P -C -I "." $< > $@
