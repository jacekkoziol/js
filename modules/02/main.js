'use strict';

window.globals = require('./utils/globals');

document.addEventListener('DOMContentLoaded', function () {
  require('./modules/slide-out')();
  require('./modules/scroll-to')();
  require('./modules/disable-scroll')();
  require('./modules/off-canvas')();
  require('./modules/float-label')();
  require('./modules/tabs').init();
  require('./modules/tabs-trigger')();
  require('./modules/dropdown')();
  require('./modules/accordion')();
  require('./modules/video-player').init();
  require('./modules/product-cards').init();
  require('./modules/track-scroll').init();
  require('./modules/autoplay-video').init();
  require('./modules/parallax').init();
  require('./modules/scroll-then-reveal').init();
  require('./modules/scroll-then-fix').init();
  require('./modules/scroll-phone').init();
  require('./modules/fade-siblings').init();
  require('./modules/timeline').init();
  require('./modules/collapse-extend').init();
  require('./modules/section-switch').init();
  require('./modules/smooth-scroll').init();
  require('./modules/scroll-fadeout').init();
  require('./modules/has-scrollbar').init();
  require('./modules/scroll-hightlight').init();
  require('./modules/browser-helper').init();
  require('./modules/video-canvas').init(); 
  require('./modules/video-fullscreen').init(); 
  //require('./modules/ie-fixed-position-scroll-fix')(); 
});
