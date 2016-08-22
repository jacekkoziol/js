'use strict';

var HasScrollBar = {
  $items: $('[data-has-scrollbar]'),
  strCssHasCurrent: 'hasScrollBar',
  strCssForParent: 'childHasScrollBar',
  
  init: function () {
    if (this.$items.length) {
      $.each(this.$items, function (i, el) {
        this.watchElement(el);
      }.bind(this));
    }
  },
  
  watchElement: function (el) {
    $(el).on('keyup change focus blur', function (e) {
      $(e.target).toggleClass(this.strCssHasCurrent, this.hasScroll(e.target));
      $(e.target).parent().toggleClass(this.strCssForParent, this.hasScroll(e.target)); 
    }.bind(this));
  },
  
  hasScroll: function (el) {
    return el.scrollHeight > $(el).innerHeight();
  }
};

module.exports = HasScrollBar;