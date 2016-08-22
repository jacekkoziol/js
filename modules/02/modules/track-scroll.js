'use strict';

var TrackScroll = {
  debugMode: false,
  $tracker: $('[data-track-scroll]'),

  init: function () {
    if (!globals.enableScrollAnimations || $(window).width() < 768) {
      return;
    }

    if (this.$tracker.length) {
      this.controller = new ScrollMagic.Controller();
      this.loadTracker();
    }
  },

  loadTracker: function () {
    $(window).on('load', function () {
      this.$tracker.each(this.startTracking.bind(this));
    }.bind(this));
  },

  startTracking: function (index, element) {
    var $element = $(element);
    var $fixedHeader = $('[data-fixed-element]').first();

    var scene = new ScrollMagic.Scene({
      triggerElement: $element[0],
      triggerHook: 0,
      duration: $element.outerHeight(),
      offset: $fixedHeader.length ? -$fixedHeader.outerHeight() : 0
    });

    scene
      .on('enter', function () {
        $('[data-scroll-to="#' + $element.attr('id') + '"]').parent().addClass('is-active');
      })
      .on('leave', function () {
        $('[data-scroll-to]').parent().removeClass('is-active');
      })
      .addTo(this.controller);

    // Debug ScrollMagic
    if (this.debugMode) {
      scene.addIndicators();
    }
  }
};

module.exports = TrackScroll;
