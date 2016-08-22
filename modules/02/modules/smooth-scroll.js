'use strict';

var SmoothScroll = {
  init: function() {
    var $sliders = $('[data-smooth-scroll]');
    
    if ($sliders.length) {
      $sliders.smoothDivScroll({
        scrollingHotSpotLeftClass: 'icon--arrow-left-hidden',
        scrollingHotSpotRightClass: 'icon--arrow-right-hidden',
        scrollingHotSpotLeftVisibleClass: "visible",
        scrollingHotSpotRightVisibleClass: "visible",
        mousewheelScrolling: "horizontal",
        mousewheelScrollingStep: 1,
        touchScrolling: true,
        manualContinuousScrolling: true,
        visibleHotSpotBackgrounds: 'always',
        autoScrollingStep: 3
      });
    }
  }
};

module.exports = SmoothScroll;