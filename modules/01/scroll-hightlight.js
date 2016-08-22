'use strict';

var ScrollHightlight = {
  $links: $('[data-scroll-hightlight]'),
  $strCssActive: 'is-active',
  controller: null,
  init: function () {
    if (this.$links.length) {
      this.controller = new ScrollMagic.Controller();
      $.each(this.$links, function (i, el) {
        this.hightlightLink(el);
      }.bind(this));
    }
  },
  hightlightLink: function (link) {
    var $link = $(link);
    var strGoTo = $link.data('scroll-to') || $link.attr('href');
    var $target;
    var intDuration;

    if (!strGoTo.replace('#', '')) {
      return true;
    }

    $target = $($link.data('scroll-to') || $link.attr('href'));
    intDuration = parseInt($target.outerHeight());

    if (!$target.length) {
      return true;
    }

    var scene = new ScrollMagic.Scene({
      triggerElement: $target.get(0),
      offset: -50,
      duration: intDuration
    });

    scene
      .triggerHook(0)
      .addTo(this.controller);

    scene.on('enter leave', function (e) {
      if (e.type === 'enter') {
        $link.addClass(this.$strCssActive);
        $link.parent().addClass(this.$strCssActive);
      } else if (e.type === 'leave') {
        $link.removeClass(this.$strCssActive);
        $link.parent().removeClass(this.$strCssActive);
      }
    }.bind(this));

    scene.on('shift enter', function () {
      intDuration = parseInt($target.outerHeight());
      scene.duration(intDuration);
    });

    $target.on('element.update', function () {
      intDuration = parseInt($target.outerHeight());
      scene.duration(intDuration);
    });

    // Debug ScrollMagic
    if (this.debugMode) {
      scene.addIndicators();
    }
  }
};

module.exports = ScrollHightlight;
