'use strict';

var $ = require('jquery');

var SelectMenu = {
  selector: {
    menu: '[data-select-menu]'
  },

  init: function () {
    //this.scrollTop();
    var $select = $(this.selector.menu);

    this.handleSelectMenu($select);
  },

  handleSelectMenu: function ($menus) {
    var currSelect;

    $menus.on('change', function (e) {
      currSelect = $(e.target);

      if(currSelect.val().trim()) {
        document.location.href = currSelect.val();
      }
    });
  }
}

module.exports = SelectMenu;
