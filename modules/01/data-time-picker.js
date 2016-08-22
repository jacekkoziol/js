'use strict';

//var cc = require('PickerConstructor');
require('../vendor/pickadate/picker.js');
require('../vendor/pickadate/picker.date.js');
require('../vendor/pickadate/picker.time.js');


var DataTimePicker = {
  selector: {
    date: '[data-datapicker]',
    time: '[data-timepicker]'
  },

  init: function () {
    this.initDatePicker();
    this.initTimePicker();
  },

  initDatePicker: function () {
    $(this.selector.date).pickadate({
      editable: false,
      format: 'dd mmmm yyyy',
      onSet: function () {
        this.$node.parsley().reset();
        this.$node.trigger('pickadateUpdate');
      }
    });
  },

  initTimePicker: function () {
    $(this.selector.time).pickatime({
      editable: false,
      format: 'h:i A',
      onSet: function () {
        this.$node.parsley().reset();
        this.$node.trigger('pickadateUpdate');
      }
    });
  }
}

module.exports = DataTimePicker;
