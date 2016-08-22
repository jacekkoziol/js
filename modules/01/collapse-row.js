const selector = {
  component: '[data-collapse-row]',
  toggle: '[data-collapse-row-toggle]',
  content: '[data-collapse-row-content]'
};

const css = {
  isOpened: 'is-opened'
}

class CollapseRow {
  constructor () {
    this.initCollapseRow();
  }

  initCollapseRow () {
    const $rows = $(selector.component);

    $rows.on('click', selector.toggle, function (e) {
      e.preventDefault();

      $(e.delegateTarget).toggleClass(css.isOpened);
    });
  }
}

export default CollapseRow;
