'use strict';

var CollapseExtend = {
  strActiveCss: 'active',
  
  init: function () {
    var $collapsseBtns = $('[data-toggle=collapse]');
    
    if ($collapsseBtns.length) {
      
      $.each($collapsseBtns, function (i, item) {
        var $currentBtn = $(item),
            $currentPanel;
        
        if($currentBtn.data('target')) {
          $currentPanel = $($currentBtn.data('target'));
        } else {
          $currentPanel = $($currentBtn.attr('href'));
        }
        
        $currentPanel.on({
          'show.bs.collapse': function () {
            this.setParentsActiveClass($currentBtn);
            this.btnSetTextOpened($currentBtn);
          }.bind(this),
          'hide.bs.collapse': function () {
            this.removeParentsActiveClass($currentBtn);
            this.btnSetTextCloseed($currentBtn);
          }.bind(this)
        });
        
        this.checkIfActive($currentBtn, $currentPanel);
        
      }.bind(this));
    }
  },
  
  setParentsActiveClass: function ($btn) {
    $btn.parent().parent().addClass(this.strActiveCss);
  },
  
  removeParentsActiveClass: function ($btn) {
    $btn.parent().parent().removeClass(this.strActiveCss);
  },
  
  checkIfActive: function ($btn, $panel) {
    if ($panel.hasClass('in') && $panel.hasClass('collapse')) {
      this.setParentsActiveClass($btn);
      this.btnSetTextOpened($btn);
    }
  },
  
  btnSetTextOpened: function ($btn) {
    if ($btn.data('toggle-txt-alt')) {
      $btn.text($btn.data('toggle-txt-alt'));
    }
  },
  
  btnSetTextCloseed: function ($btn) {
    if ($btn.data('toggle-txt')) {
      $btn.text($btn.data('toggle-txt'));
    }
  }
};

module.exports = CollapseExtend;