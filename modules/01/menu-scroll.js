'use strict';

var $ = require('jquery');

var MenuScroll = {
  selector: {
    menu: '[data-menu-scroll]',
    btnLeft: '[data-menu-scroll-left]',
    btnRight: '[data-menu-scroll-right]',
    listWrapper: '.menu-scroll__list-wrapper',
    menuList: '.menu-scroll__list'
  },

  init: function () {
    var $menus = $(this.selector.menu);

    if ($menus.length) {
      $menus.each(function (i, el) {
        var $menu = $(el);

        this.handleMenu($menu);
      }.bind(this));
    }
  },

  scrollMenuList: function ($menu, $menuData, direction) {
    $menuData.wrapperWidth = $menuData.$wrapper.outerWidth();
    $menuData.menuListWidth = $menuData.$menuList.outerWidth();
    $menuData.currPosition = parseInt($menuData.$menuList.css('left'), 10);
    $menuData.slidesCount = Math.ceil($menuData.menuListWidth / $menuData.wrapperWidth);

    if (direction === 'next' && $menuData.slide < $menuData.slidesCount) {
      $menuData.slide++;
    }

    if (direction === 'prev' && $menuData.slide > 1) {
      $menuData.slide--;
    }

    $menuData.nextMove = ($menuData.slide * $menuData.wrapperWidth) - $menuData.wrapperWidth;

    /* TODO:: update */
    if ($menuData.nextMove + $menuData.wrapperWidth >= $menuData.menuListWidth
        && direction === 'next' && $menuData.slidesCount > 1) {
      $menuData.nextMove = $menuData.nextMove - ($menuData.nextMove + $menuData.wrapperWidth - $menuData.menuListWidth);
    }

    $menuData.currPosition = -$menuData.nextMove;

    $menuData.$menuList.css('left', $menuData.currPosition + 'px');
  },

  handleMenu: function ($menu) {
    var $menuData = {
      $wrapper: $menu.find(this.selector.listWrapper).first(),
      $menuList: $menu.find(this.selector.menuList).first(),
      wrapperWidth: $menu.find(this.selector.listWrapper).first().outerWidth(),
      menuListWidth: $menu.find(this.selector.menuList).first().outerWidth(),
      currnetPosition: 0,
      slidesCount: 0,
      slide: 1,
      nextMove: 0
    };

    $menu.on('click', this.selector.btnLeft, function (e) {
      e.preventDefault();
      this.scrollMenuList($menu, $menuData, 'prev');
    }.bind(this));

    $menu.on('click', this.selector.btnRight, function (e) {
      e.preventDefault();
      this.scrollMenuList($menu, $menuData, 'next');
    }.bind(this));

    $(window).on('resize', function () {
      $menuData.currnetPosition = 0;
      $menuData.slide = 0;
      $menuData.$menuList.css('left', '0px');
    })
  }
}

module.exports = MenuScroll;
