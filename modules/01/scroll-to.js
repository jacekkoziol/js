'use strict';

var ScrollTo = function () {
  var $scrollTo = $('[data-scroll-to]');
  var duration = 500;
  var temOffsetFixedMenu = -50;

  $scrollTo.on('click', function (ev) {
    ev.preventDefault();

    var $target = $($(this).data('scroll-to'));
    var fixedHeight = $('[data-fixed-element]').first().outerHeight();
    var offset = Math.ceil($target.offset().top) + temOffsetFixedMenu;

    if ($target.length) {
      $('html, body').animate({
        scrollTop: offset > fixedHeight ? offset - fixedHeight : offset
      }, duration);
    }
  });
};

module.exports = ScrollTo;
