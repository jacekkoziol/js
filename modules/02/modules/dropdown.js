'use strict';

var Dropdown = function () {
  var timer;
  
  function hideDropdown() {
    $('[data-dropdown-toggle]').removeClass('is-active');
    $('[data-dropdown]').removeClass('is-active');
  }
  
  $('[data-dropdown-toggle]').on({
    click: function () {
      //ev.preventDefault();
      //ev.stopPropagation();

      $(this).toggleClass('is-active');
      $($(this).data('dropdown-toggle')).toggleClass('is-active');
    },
    mouseenter: function () {
      hideDropdown();
      clearTimeout(timer);
      $(this).addClass('is-active');
      $($(this).data('dropdown-toggle')).addClass('is-active');
    },
    mouseleave: function () {
      timer = setTimeout(hideDropdown, 300);
    }
  });

  $('[data-dropdown]').on({
    mouseleave: hideDropdown,
    mouseenter: function () {
      clearTimeout(timer);
    }
  });

  $(document).on('click', hideDropdown);
};

module.exports = Dropdown;
