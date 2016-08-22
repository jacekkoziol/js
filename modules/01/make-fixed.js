import ScrollMagic from 'scrollmagic';

const selector = {
  el: '[data-make-fixed]'
}

const conf = {
  notMobileWidth: 768,
  mobileOffset: -50
}

const controller = new ScrollMagic.Controller();

class MakeFixed {
  constructor () {
    this.attachOffset = 0;

    this.updateOffset();
    this.init();
  }

  init () {
    const $elements = $(selector.el);

    $elements.each(function (i, el) {
      this.attachScrollMagic(el);
    }.bind(this));
  }

  attachScrollMagic (el) {
    const intDuration = 0;
    const scene = new ScrollMagic.Scene({
      triggerElement: el,
      offset: this.attachOffset,
      duration: intDuration
    });

    scene
      .setPin(el, {
        pushFollowers: false
      })
      .triggerHook(0)
      .addTo(controller);

    this.watchOffset(scene);
  }

  updateOffset () {
    if (window.innerWidth >= conf.notMobileWidth) {
      this.attachOffset = 0;
    } else {
      this.attachOffset = conf.mobileOffset;
    }
  }

  watchOffset (scene) {
    $(window).on('load resize', () => {
      this.updateOffset();
      scene.offset(this.attachOffset).update(true);
    });
  }
}

export default MakeFixed;
