'use strict';

var AutoplayVideo = {
  debugMode: false,
  $videosTriggers: $('[data-video-autoplay]'),
  strIsPlaying: 'is-playing',

  init: function () {
    if (!globals.enableVideoAutoplay) {
      return;
    }

    if (this.$videosTriggers.length) {
      this.controller = new ScrollMagic.Controller();
      this.autoplayInit();
    }
  },

  // Autoplay videos when in viewport
  autoplayInit: function () {
    $(window).on('load', function () {
      this.$videosTriggers.each(this.addScrollMagicToElement.bind(this));
    }.bind(this));
  },

  // Method adding scrollMagic to the element
  // @param trigger {DOM object} - trigger element
  addScrollMagicToElement: function (i, trigger) {
    var $video;
    var oTriggerIsVideo = false;

    oTriggerIsVideo = (trigger.nodeName.toUpperCase() === 'VIDEO') ? true : false;

    if (oTriggerIsVideo) {
      $video = $(trigger);
      this.attachAutoplayToVideo($video, trigger);
    } else {
      $video = $(trigger).find('video');

      if ($video.length) {
        $.each($video, function (i, el) {
          this.attachAutoplayToVideo($(el), trigger);
        }.bind(this));
      }
    }
  },

  // Add autoplay on scroll to video
  // @param $video {object} - video element
  // @param trigger {DOM object} - the trigger element
  attachAutoplayToVideo: function ($video, trigger) {
    var strAttrAllowPlay = $video.attr('data-scroll-autoplay');
    var videoHeight;
    var scrollDuration;
    var triggerHook;
    var $videoParent = $video.closest('[data-video-parent]');

    if (strAttrAllowPlay && strAttrAllowPlay.toLowerCase() === 'false') {
      return true;
    }
    
    $video.on('ended', function () {
        $videoParent.removeClass(this.strIsPlaying);
    }.bind(this));

    videoHeight = $video.first().height();

    // If video not visible, try to get sizes from visible one
    if (!videoHeight) {
      var $visibleVideo = $(trigger).find('video:visible').first();

      if ($(trigger).length) {
        videoHeight = $visibleVideo.height();
      }
    }

    scrollDuration = window.innerHeight - videoHeight;
    triggerHook = scrollDuration / window.innerHeight;

    var scene = new ScrollMagic.Scene({
      triggerElement: trigger,
      offset: 0,
      duration: scrollDuration
    });
    
    scene
      .triggerHook(triggerHook)
      .addTo(this.controller);

    // Debug ScrollMagic
    if (this.debugMode) {
      scene.addIndicators();
    }

    scene
      .on('enter', function () {
        if (strAttrAllowPlay && strAttrAllowPlay.toLowerCase() === 'force') { 
          $video[0].play();
          $videoParent.addClass(this.strIsPlaying);
        } else if ($video.is(':visible')) {
          $video[0].play();
          $videoParent.addClass(this.strIsPlaying);
        }
      }.bind(this))
      .on('leave', function () {
        if ($video.first().attr('data-prevent-autostop')) {
          return;
        }

        $video[0].pause();
      });
  }
};

module.exports = AutoplayVideo;
