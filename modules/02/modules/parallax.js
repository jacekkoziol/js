'use strict';

var Parallax = {
  debugMode: false,
  $parallax: $('[data-parallax]'),

  init: function () {
    if (!globals.enableScrollAnimations || $(window).width() < 768) {
      return;
    }

    if (this.$parallax.length) {
      this.controller = new ScrollMagic.Controller();
      this.animateParallax();
    }
  },

  animateParallax: function () {
    this.$parallax.each(function (index, element) {
      var $element = $(element);
      var $elementBg = $element.find('[data-parallax-background]');
      var offset = parseInt($element.data('parallax'), 10);
      
      if(!offset || isNaN(offset)) {
        offset = 700;
      }

      var scene = new ScrollMagic.Scene({
        triggerElement: $element[0],
        triggerHook: 'onEnter',
        duration: '150%',
        offset: offset
      });

      scene
        .setTween($elementBg[0], { y: '50%' })
        .addTo(this.controller);

      // Debug ScrollMagic
      if (this.debugMode) {
        scene.addIndicators();
      }
    }.bind(this));
  }
};

module.exports = Parallax;
