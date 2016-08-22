'use strict';

var DisableScroll = function () {
  $('[data-disable-scroll]').on('mousewheel DOMMouseScroll', function (ev) {
    var scrollTo = null;

    if (ev.type === 'mousewheel') {
      scrollTo = (ev.originalEvent.wheelDelta * -1);
    }
    else if (ev.type === 'DOMMouseScroll') {
      scrollTo = 40 * ev.originalEvent.detail;
    }

    if (scrollTo) {
      ev.preventDefault();
      $(this).scrollTop(scrollTo + $(this).scrollTop());
    }
  });
};

module.exports = DisableScroll;
