'use strict';

var ScrollPhone = {
  debugMode: false,
  $phones: $('[data-scroll-phone]'),

  init: function () {
    if (!globals.enableScrollAnimations || $(window).width() < 768) {
      return;
    }

    if (this.$phones.length) {
      this.controller = new ScrollMagic.Controller();
      this.scrollPhoneInit();
    }
  },

  // Initialize scroll phone
  scrollPhoneInit: function () {
    $.each(this.$phones, function (i, el) {
      this.attachScrollMagic(el);

    }.bind(this));
  },

  // Initialize scrollMagic for element
  // @param trigger {DOM object} - the trigger element
  attachScrollMagic: function (trigger) {
    var scene = new ScrollMagic.Scene({
      triggerElement: trigger,
      offset: 0,
      duration: this.getElementDuration(trigger)
    })
    .setPin(trigger, { pushFollowers: false })
    .triggerHook(0.20)
    .addTo(this.controller);

    // Debug ScrollMagic
    if (this.debugMode) {
      scene.addIndicators();
    }
  },

  // Get scroll duration for the element
  // @param trigger {DOM object} - the trigger element
  // @return {Int} - difference between trigger and destination point
  getElementDuration: function (trigger) {
    var strAnchor = $(trigger).attr('data-scroll-phone').trim();
    var offset;

    if (strAnchor) {
      var $anchor = $(strAnchor);

      if ($anchor.length) {
        offset = parseInt($anchor.offset().top - $(trigger).offset().top, 10);
      }
    }

    return offset;
  }

};

module.exports = ScrollPhone;
