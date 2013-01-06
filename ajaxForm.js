(function() {

function AjaxForm(form, onsuccess, onerror) {
	Assert.present(form);
	this.form = form;
	this.onsuccess = onsuccess;
	this.onerror = onerror;
}
AjaxForm.prototype.submit = function() {
	var formdata = Flower.formdata;
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
		Flower.ajaxer.get(action + '?' + formdata.encode(values), this.onsuccess, this.onerror);
	} else if (method === 'post') {
		Flower.ajaxer.post(action, formdata.encode(values), this.onsuccess, this.onerror);
	} else {
		Assert.fail("Unknown action of form: " + action);
	}
};

Flower.AjaxForm = AjaxForm;

})();
