const selector = {
  link: '[data-toggle]'
}

const css = {
  active: 'is-active'
}

class Toggle {
  constructor () {
    this.initToggle();
  }

  initToggle () {
    let $currToggler;
    let $elToToggle;
    let oData;

    $(selector.link).on('click', (e) => {
      e.preventDefault();

      $currToggler = $(e.currentTarget);
      oData = $currToggler.data();
      $elToToggle = $(oData.toggle);

      $currToggler.toggleClass(css.active);
      $elToToggle.toggleClass(css.active);
    });
  }

}

export default Toggle;
