'use strict';

var ScrollThenReveal = {
  debugMode: false,
  $elements: $('[data-reveal]'),
  $elementsTrigger: $('[data-reveal-trigger]'),

  init: function () {
    if (!globals.enableScrollAnimations || $(window).width() < 768) {
      return;
    }

    if (this.$elements.length && this.$elementsTrigger.length) {
      this.controller = new ScrollMagic.Controller();
      this.revealElement();
    }
  },
 
  findSibling: function (strTarget) {
    var arrSiblings = [];
    var arrOther = [];
    
    this.$elements.each(function (i, el) {
      var tmpData = $(el).data('reveal');
      
      if(tmpData && tmpData.trim() === strTarget) {
        arrSiblings.push(el);
      } else {
        arrOther.push(el);
      }
    });
    
    this.$elements = $(arrOther);
    
    if (arrSiblings.length) {
      return $(arrSiblings);
    }
  },
 
  revealElement: function () {
    this.$elementsTrigger.each(function (i, el) {
      var $target;
      var trigger;
      var strDataTarget = $(el).data('reveal-trigger');  
          
      if (strDataTarget && strDataTarget.trim()) {
        strDataTarget = strDataTarget.trim();
        $target = this.findSibling(strDataTarget);
        
        if ($target.length) {
          trigger = el;
        } else {
          trigger = this.$elementsTrigger[0];
        }

      } else {
        trigger = this.$elementsTrigger[0];
        $target = this.$elements;
      }
      
      var scene = new ScrollMagic.Scene({
        triggerElement: trigger,
        duration: $(trigger).outerHeight()
      });

      scene
        .triggerHook('onLeave')
        .addTo(this.controller);

      // Debug ScrollMagic
      if (this.debugMode) {
        scene.addIndicators();
      }
      
      // Watch scroll events
      scene
        .on('enter', function () {
          $target.removeClass('is-revealed');
        }.bind(this))
        
        .on('leave', function () {
          if ($(window).scrollTop() > 100) {
            $target.addClass('is-revealed');
          }
        }.bind(this));
      
    }.bind(this));
  }
  
};

module.exports = ScrollThenReveal;
