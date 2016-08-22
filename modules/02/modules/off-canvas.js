'use strict';

var OffCanvas = function () {
  $('[data-off-canvas-toggle]').on('click', function (ev) {
    ev.preventDefault();
    $(document.body).toggleClass('has-nav-open');
  });
};

module.exports = OffCanvas;
