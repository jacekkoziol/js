'use strict';

var Timeline = {
  $arrMainContainer: $('[data-timeline]'),
  strPrev: 'prev',
  strNext: 'next',
  strCssActive: 'active',
  
  /**
   * Initialize Timeline module for the page
   * @method init
   */
  init: function () {
    if (this.$arrMainContainer.length){
      $.each(this.$arrMainContainer, function(i, item) {
        var oData =this.initTimeline(item);

        if (oData.$row && oData.$row.length && 
            oData.$btns && oData.$btns.length && 
            oData.$items && oData.$items.length) {
          
          this.handleTimelineMod(oData);
          this.handleItemsClick(oData);
        }
      }.bind(this));
    }
  },
  
  /** 
   * Initialize all Data needed to handle single timeline component
   * @method initTimeline
   * @param {DOMobject} mainContainer - single container of the timeline module
   * @return {Object} - Object with all needed data for single module
   */
  initTimeline: function (mainContainer) {
    var $cont = $(mainContainer),
        oData = {
          $cont: $cont,
          $row: $cont.find('[data-timeline-row]').first(),
          $btns: $cont.find('[data-timeline-btn]'),
          $items: $cont.find('.timeline-item'),
          $currItem: null,
          intActiveItem: 0,
          intVisibleItems: 0,
          strDirection: this.strNext,
          bLoop: true
        };

    return oData;
  },
  
  
  /**
   * Initialize single timeline component
   * @method handleTimelineMod
   * @param {Object} oData - Object with all needed data for single module
   */
  handleTimelineMod: function (oData) {
    oData.$row.css({
      position: 'relative',
      left: '0px'
    }); 
    
    this.btnsAddAction(oData);
  },
  
  /**
   * Add actions for Next and Prev buttons
   * @method btnsAddAction
   * @param {Object} oData - Object with all needed data for single module
   */
  btnsAddAction: function (oData) {
    
    oData.$btns.on('click', function (e) {
      e.preventDefault();

      if ($(e.delegateTarget).attr('data-timeline-btn').toLowerCase() === this.strPrev) {
        oData.strDirection = this.strPrev;
        if (oData.bLoop) {
          oData.intActiveItem = (oData.intActiveItem > 0) ? oData.intActiveItem - 1 : oData.$items.length - 1;
        } else {
          oData.intActiveItem = (oData.intActiveItem > 0) ? oData.intActiveItem - 1 : 0;
        }
      } else {
        oData.strDirection = this.strNext;
        if (oData.bLoop) {
          oData.intActiveItem = (oData.intActiveItem < oData.$items.length - 1) ? oData.intActiveItem + 1 : 0;
        } else {
          oData.intActiveItem = (oData.intActiveItem < oData.$items.length - 1) ? oData.intActiveItem + 1 : oData.$items.length - 1;
        }
      }

      if (oData.$items[oData.intActiveItem]) {
        oData.$currItem = $(oData.$items[oData.intActiveItem]);

        this.selectActiveItem(oData);

        oData.intVisibleItems = Math.floor(oData.$row.width() / oData.$currItem.width());

        if (oData.strDirection === this.strNext && oData.intActiveItem % oData.intVisibleItems === 0) {
          oData.$row.css('left', -oData.$currItem.position().left);
        }

        if (oData.strDirection === this.strPrev && (oData.intActiveItem + 1) % oData.intVisibleItems === 0) {
          var moveTo = oData.intActiveItem - (oData.intActiveItem % oData.intVisibleItems);
          var noMoveTo = $(oData.$items[moveTo]).position().left;

          oData.$row.css('left', -noMoveTo);
        }
      }
    }.bind(this));
  },
  
  /**
   * Handle click event of every Timeline item
   * @method handleItemsClick
   * @param {Object} oData - Object with all needed data for single module
   */
  handleItemsClick: function (oData) {
    
    oData.$items.on('click', function (e) {
      oData.$items.each(function (i, item) {
         if (e.delegateTarget === item) {
           oData.intActiveItem = i;
           oData.$currItem = $(oData.$items[oData.intActiveItem]);
           return false;
         }
      });

      this.selectActiveItem(oData);
    }.bind(this));
  },
  
  /**
   * Hightlight correct item
   * @method selectActiveItem
   * @param {Object} oData - Object with all needed data for single module
   */
  selectActiveItem: function (oData) {
    oData.$items.removeClass(this.strCssActive);
    oData.$currItem.addClass(this.strCssActive);
  }
};

module.exports = Timeline;
