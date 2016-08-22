'use strict';

var ProductCards = {
  debugMode: false,
  $productCards: $('[data-product-cards]'),
  $cards: $('[data-product-card]'),
  $finish: $('[data-product-cards-finish]'),

  init: function () {
    if (!globals.enableScrollAnimations || $(window).width() < 768) {
      return;
    }

    if (this.$productCards.length) {
      this.controller = new ScrollMagic.Controller();
      this.animateCards();
    }
  },

  animateCards: function () {
    $(window).on('load', function () {
      this.$cards.each(this.animateCard.bind(this));
    }.bind(this));
  },

  animateCard: function (index, element) {
    var timeline = new TimelineLite();

    var $card = $(element);
    var featured = $card.data('product-card') === 'featured';

    var cardOffset = $card.offset().left + ($card.width() / 2);
    var centerOffset = this.$productCards.offset().left + (this.$productCards.width() / 2);
    var sceneDuration = this.$finish.offset().top - this.$productCards.offset().top - (this.$finish.outerHeight() / 4);

    var timelineSteps = [{
      duration: 0,
      properties: {
        zIndex: (this.$cards.length - index)
      }
    }, {
      duration: 10,
      properties: {
        rotation: featured ? 10 : (Math.floor(Math.random() * 61) - 30),
        x: featured ? null : (centerOffset - cardOffset),
        ease: Power2.easeInOut,
        scale: 0.75
      }
    }, {
      duration: 1,
      properties: {
        opacity: 0,
        ease: Power2.easeInOut
      }
    }];

    timelineSteps.forEach(function (step) {
      timeline.to($card[0], step.duration, step.properties);
    });

    var scene = new ScrollMagic.Scene({
      triggerElement: this.$productCards[0],
      triggerHook: 0.33,
      offset: featured ? 0 : 35,
      duration: sceneDuration
    });

    scene
      .setPin($card[0])
      .setTween(timeline)
      .addTo(this.controller);
      
    scene.on('enter', function () {
      this.$productCards.addClass('is-pined');
    }.bind(this));

    // Activate 'carousel' after leaving the scene
    scene.on('leave', function (ev) {
      if (ev.scrollDirection === 'FORWARD' && this.$finish.find('.active').length === 0) {
        this.$finish.find('[data-tab]').first().trigger('click');
      }
      this.$productCards.removeClass('is-pined');
    }.bind(this));

    // Debug ScrollMagic
    if (this.debugMode) {
      scene.addIndicators();
    }
  }
};

module.exports = ProductCards;
