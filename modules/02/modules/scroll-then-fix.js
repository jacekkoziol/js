'use strict';

var ScrollThenFix = {
  debugMode: false,
  $elements: $('[data-fix]'),
  strCssFixedClass: 'isFixed',

  init: function () {
    if (!globals.enableScrollAnimations || $(window).width() < 768) {
      return;
    }

    if (this.$elements.length) {
      this.controller = new ScrollMagic.Controller();
      this.fixElement();
    }
  },

  fixElement: function () {
    this.$elements.each(function (index, element) {
      var $target = $(element);
      var strData = $target.data('fix');
      var strAdditionalClass = ($target.data('fix')) ? $target.data('fix').trim() : '';
      var $body = $('body');
      var strBodyCss = (strAdditionalClass) ? 'elementFix-' + strAdditionalClass : '';

      var scene = new ScrollMagic.Scene({
        triggerElement: $target[0],
        triggerHook: 0
      });
      
      if (strData && strData.indexOf('fixNoPin') !== -1) {
        scene.addTo(this.controller);
      } else {
        scene
          .setPin($target[0])
          .addTo(this.controller);
      }
      
      if (strBodyCss) {
        $body.addClass(strBodyCss);
      }

      scene
        .on('enter', function () {
          $target.addClass(this.strCssFixedClass);
          $target.addClass(strAdditionalClass);
        }.bind(this))
        .on('leave', function() {
          $target.removeClass(this.strCssFixedClass);
          $target.removeClass(strAdditionalClass);
        }.bind(this));

      // Debug ScrollMagic
      if (this.debugMode) {
        scene.addIndicators();
      }

    }.bind(this));
  }
};

module.exports = ScrollThenFix;
