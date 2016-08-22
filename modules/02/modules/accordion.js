'use strict';

var Accordion = function () {
  var $accordion = $('[data-accordion]');

  $accordion.on('click', function (ev) {
    ev.preventDefault();

    var updatedText = '';
    var $accordion = $($(this).data('accordion'));
    $accordion.slideToggle().toggleClass('is-active');
    
    setTimeout(function(){
      $accordion.closest('.section').trigger('element.update');
    }, 500);
    
    // Less is More, More is Less
    if ($accordion.hasClass('is-active')) {
      updatedText = $(this).text().replace('more', 'less');
    } else {
      updatedText = $(this).text().replace('less', 'more');
    }

    $(this).text(updatedText);
  });
};

module.exports = Accordion;
