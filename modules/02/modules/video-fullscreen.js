// require VideoJs module

'use strict';

var VideoFullscreen = {
  $modBtns: $('[data-video-fullscreen]'),
  $videojs: window.videojs,
  
  init: function () {
    
    if (!this.$videojs) {
      console.log('VideoJs module missing.');
      return false;
    }
    
    if (this.$modBtns.length) {
      $.each(this.$modBtns, function (i, item) {
        this.handler(item);
        this.addAdditionalCloseBtn(item);
      }.bind(this));
    }
  },
  
  handler: function (btn) {
    var $btn = $(btn);
    var strAim = $btn.data('video-fullscreen');
    var $videoMod;
    var $btnFullscreen;
    
    if (!strAim) {
      return true;
    }
    
    $videoMod = this.$videojs(strAim);
    $btnFullscreen = $videoMod.controlBar.fullscreenToggle;
    
    $btn.on('click', function (e) {
      e.preventDefault();
      
        $btnFullscreen.trigger('click');
        
        $videoMod.on('fullscreenchange', function () {
          if ($videoMod.isFullscreen_) {
            $videoMod.play();
          } else {
            $videoMod.pause();
          }
        });
    });
  },
  
  addAdditionalCloseBtn: function (btn) {
    var $btn = $(btn);
    var strAim = $btn.data('video-fullscreen');
    var $videoMod;
    var $btnFullscreen;
    
    if (!strAim) {
      return true;
    }
    
    $videoMod = this.$videojs(strAim);
    $btnFullscreen = $videoMod.controlBar.fullscreenToggle;
    
    var $closeBtn = $('<a>', {
      'href': '#',
      'class': 'vjs-close-fullscreen',
      'html': '<i class="icon icon--close"></i>'
    }).on('click', function (e) {
      e.preventDefault();
      $btnFullscreen.trigger('click');
    });
    
    $closeBtn.appendTo($videoMod.el_);
  }
  
};

module.exports = VideoFullscreen;