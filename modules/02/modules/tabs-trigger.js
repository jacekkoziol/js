'use strict';

var TabsTrigger = function () {
  var $tabTrigger = $('[data-tab-trigger]');
  
  $tabTrigger.on('click', function (ev) {
    ev.preventDefault();
    
    var $tmpTab = $('[data-tab][href*=' + $(ev.delegateTarget).attr('href').replace('#', '') + ']');
    
    if ($tmpTab.length) {
      $tmpTab.trigger('click');
    }
  });
};

module.exports = TabsTrigger;