'use strict';

var ScrollFadeout = {
  $fadeEl: $('[data-scroll-fadeout]'), 
  
  init: function () {
    if (this.$fadeEl.length) {
      this.controller = new ScrollMagic.Controller();
      this.initScrollMagic();
    }
  },
  
  initScrollMagic: function () {
    $.each(this.$fadeEl, function (i, item) {

      var duration = (window.innerHeight - $(item).outerHeight()) / 2,
          hook = ($(item).position().top / window.innerHeight) - 0.02;

      var scene = new ScrollMagic.Scene({
        triggerElement: item,
        offset: 0,
        duration: duration
      })
      .triggerHook(hook)
      .addTo(this.controller);
      
      scene.on('progress', function (ev) {
        $(item).css('opacity', 1 - ev.progress);
      });

      // Debug ScrollMagic
      if (this.debugMode) {
        scene.addIndicators();
      }
      
    }.bind(this));
  }
  
};

module.exports = ScrollFadeout;