flower-0.1.js: flower.js ecma5.js assert.js errors.js string.js cookie.js csser.js eventer.js domer.js ajaxer.js forms.js ajaxForm.js detectIE.js findPos.js
	cpp -P -C -I "." $< > $@
