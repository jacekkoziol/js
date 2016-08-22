'use strict';

var SectionSwitch = {
  init: function () {
    this.switchSection();
  },
  
  switchSection: function () {
    var $btns = $('[data-section-switch]'),
        timing = 'slow';
    
    $btns.on('click', function (ev) {
      ev.preventDefault();
      
      var $currEl = $(ev.delegateTarget),
          $tmpToClose = $($currEl.data('section-switch')),
          $tmpToOpen = $($currEl.data('section-switch-to'));
      
      if ($tmpToClose.length && $tmpToOpen.length) {
        $tmpToClose.slideUp(timing);
        $tmpToOpen.slideDown(timing);
      }
    });
  }
};

module.exports = SectionSwitch;