import 'slick-carousel';

const selector = {
  menu: '[data-menu-scroll-slick]',
  arrowLeft: '[data-menu-scroll-slick-left]',
  arrowRight: '[data-menu-scroll-slick-right]'
}

class MenuScrollSlick {
  constructor () {
    this.initScrollMenu();
  }

  initScrollMenu () {
    const $arrowLeft = $(selector.arrowLeft);
    const $arrowRight = $(selector.arrowRight);
    const $menu = $(selector.menu);

    $menu.slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: true,
      prevArrow: $arrowLeft,
      nextArrow: $arrowRight
    });

    this.resetOnResize($menu);
  }

  resetOnResize ($menu) {
    $(window).on('resize', () => {
      $menu.slick('slickGoTo', 0);
    })
  }

}

export default MenuScrollSlick;
