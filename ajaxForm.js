#ifndef AJAXFORM_JS_
#define AJAXFORM_JS_

#include "errors.js"
#include "assert.js"
#include "forms.js"
#include "ajaxer.js"

function AjaxForm(form, onsuccess, onerror) {
	assert.present(form);
	assert.present(onsuccess);
	this.form = form;
	this.onsuccess = onsuccess;
	this.onerror = onerror;
}

AjaxForm.prototype.submit = function() {
	// get values
	var values = formdata.newValue();
	do {
		var inputs = this.form.elements;
		for (var i = 0; i < inputs.length; i++) {
			var e = inputs[i];
			switch (e.type.toLowerCase()) {
				case 'text':
				case 'hidden':
					if (e.name) {
						formdata.add(values, e.name, e.value);
					}
					break;
				case 'checkbox':
				case 'radio':
					if (e.name && e.checked) {
						formdata.add(values, e.name, e.value);
					}
					break;
				default:
					break;
			}
		}
	} while(false);

	var action = this.form.action;
	var method = this.form.method.toLowerCase();

	if (method === 'get') {
		ajaxer.get(action + '?' + formdata.encode(values), this.onsuccess, this.onerror);
	} else if (method === 'post') {
		ajaxer.post(action, formdata.encode(values), this.onsuccess, this.onerror);
	} else {
		throw new ArgumentError("Unknown action of form: " + action);
	}
};

#endif // AJAXFORM_JS_
