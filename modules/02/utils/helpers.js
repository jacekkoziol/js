'use strict';

var Helpers = {
  keys: {37: 1, 38: 1, 39: 1, 40: 1},

  preventDefault: function (e) {
    e = e || window.event;

    if (e.preventDefault) {
      e.preventDefault();
    }

    e.returnValue = false;
  },

  preventDefaultForScrollKeys: function (e) {
    if (Helpers.keys[e.keyCode]) {
      Helpers.preventDefault(e);
      return false;
    }
  },

  disableScroll: function () {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', Helpers.preventDefault, false);
    }

    window.onwheel = Helpers.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = Helpers.preventDefault; // older browsers, IE
    window.ontouchmove  = Helpers.preventDefault; // mobile
    document.onkeydown  = Helpers.preventDefaultForScrollKeys;
  },

  enableScroll: function () {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', Helpers.preventDefault, false);
    }

    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }

};

module.exports = Helpers;
