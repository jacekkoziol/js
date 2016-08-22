import 'slick-carousel';

const select = {
  root: '.js-car-carousel',
  controlled: '.js-car-carousel-controlled',
  slide: '.js-car-carousel__slide',
  prevArrow: '.js-car-carousel__arrow.is-prev',
  nextArrow: '.js-car-carousel__arrow.is-next',
}

class CarCarousel {
  constructor() {
    this.setupSlickEvents();
    this.initSlick();
  }

  initSlick() {
    const $carousel = $(select.root);
    const $controlledCarousel = $(select.controlled);

    $carousel.slick({
      slide: select.slide,
      slidesToShow: 1,
      lazyLoad: 'ondemand',
      initialSlide: 1,
      centerMode: true,
      centerPadding: '25%',
      infinite: false,
      arrows: false,
      dots: true,
      mobileFirst: true,
      asNavFor: select.controlled,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: false,
        },
      }],
    });

    $controlledCarousel.slick({
      slidesToShow: 1,
      initialSlide: 1,
      infinite: false,
      arrows: false,
      dots: false,
    });
  }

  setupSlickEvents() {
    const $carousel = $(select.root);

    $carousel.on('init', () => {
      $carousel.find('.slick-prev').empty().append('<i class="icon icon--arrow-prev"></i>');
      $carousel.find('.slick-next').empty().append('<i class="icon icon--arrow-next"></i>');
    });
  }
}

export default CarCarousel;
