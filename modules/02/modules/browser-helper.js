'use strict';

var BrowserHelper = {
  init: function () {
    this.checkIE11();
  },
  
  checkIE11: function () { 
    if (navigator.userAgent.indexOf("Trident/7.0") > 0) {
      return;
    } else {
      $('html').addClass('full-flexbox');
    }
  }
};

module.exports = BrowserHelper;