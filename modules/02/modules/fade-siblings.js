'use strict';

var FadeSiblings = {

  init: function () {
    this.fadeSiblings();
  },

  // On hover add fade CSS class siblings elements with the same data-fade-sibling value
  fadeSiblings: function () {
    var $handleElements = $('[data-fade-siblings]');
    var strDataAttr = 'data-fade-siblings';
    var strFadeCss = 'fade-state';
    var strDataVal = '';
    var $tmpSiblings;

    if ($handleElements.length) {
      $handleElements.on({
        mouseover: function () {
          strDataVal = $(this).attr(strDataAttr).trim();

          if (strDataVal) {
            $tmpSiblings = $('['+ strDataAttr +'='+ strDataVal +']').not(this);
            $tmpSiblings.addClass(strFadeCss);
          }
        },
        mouseout: function () {
          if ($tmpSiblings && $tmpSiblings.length) {
            $tmpSiblings.removeClass(strFadeCss);
          }
        }
      });
    }
  }

};

module.exports = FadeSiblings;
