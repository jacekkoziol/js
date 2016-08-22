'use strict';

require('parsleyjs');

var FormValidation = {
  selector: {
    form: '[data-form-validate]'
  },

  init: function () {
    this.initFormValidation();
  },

  initFormValidation: function () {
    $(this.selector.form).parsley();
  }

}

module.exports = FormValidation;
