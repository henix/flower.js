flower-0.1.js: flower.js ecma5.js assert.js errors.js string.js cookie.js csser.js findPos.js eventer.js ajaxer.js forms.js ajaxForm.js detectIE.js
	cpp -P -C -I "." $< > $@
