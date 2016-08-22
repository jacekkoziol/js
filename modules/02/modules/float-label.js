'use strict';

var FloatLabel = function () {
  var $input = $('[data-float-label]');

  $input.bind('checkval',function () {
    $(this).prev('label').toggleClass('is-visible', this.value !== '');
    $(this).parent().toggleClass('has-content', this.value !== '');
  }).trigger('checkval');

  $input.on({
    keyup: function () {
      $(this).trigger('checkval');
    },

    change: function () {
      $(this).trigger('checkval');
    },

    focus: function () {
      $(this).prev('label').addClass('is-active');
    },

    blur: function () {
      $(this).prev('label').removeClass('is-active');
    }
  });
};

module.exports = FloatLabel;
