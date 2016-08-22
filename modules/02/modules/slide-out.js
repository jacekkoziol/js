'use strict';

var SlideOut = function () {
  var $slideOut = $('[data-slide-out]');

  if ($slideOut.length) {
    $(window).on('load', function () {
      $(document.body).css({ paddingBottom: $slideOut.outerHeight() });
    });
  }
};

module.exports = SlideOut;
