'use strict';

var $ = require('jquery');

var BackToTop = {
  selector: {
    btn: '[data-back-to-top]'
  },

  init: function () {
    this.scrollTop();
  },

  scrollTop: function () {
    var duration = 500;

    $(this.selector.btn).on('click', function (e) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: 0
      }, duration);
    })
  }
}

module.exports = BackToTop;
