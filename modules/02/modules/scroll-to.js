'use strict';

var ScrollTo = function () {
  var $scrollTo = $('[data-scroll-to]');

  $scrollTo.on('click', function (ev) {
    ev.preventDefault();

    var $target = $($(this).data('scroll-to'));
    var fixedHeight = $('[data-fixed-element]').first().outerHeight();
    var offset = Math.ceil($target.offset().top);

    if ($target.length) {
      $('html, body').animate({
        scrollTop: offset > fixedHeight ? offset - fixedHeight : offset
      }, 500);
    }
  });
};

module.exports = ScrollTo;
