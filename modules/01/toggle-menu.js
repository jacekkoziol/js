'use strict';

var $ = require('jquery');

var ToggleMenu = {
  selector: {
    btns: '[data-toggle-menu]',
    aim: 'toggle-menu'
  },

  css: {
    active: 'is-open'
  },

  init: function () {
    var $btns = $(this.selector.btns);
    this.toggleMenu($btns);
  },

  toggleMenu: function ($btns) {
    if ($btns.length) {
      var $menu;

      $btns.on('click', function(e){
        e.preventDefault();
        $menu = $($(e.target).data(this.selector.aim));

        $(e.target).toggleClass(this.css.active);
        $menu.toggleClass(this.css.active);

      }.bind(this))
    }
  }

}

module.exports = ToggleMenu;
