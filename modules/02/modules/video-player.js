'use strict';

var VideoPlayer = {
  $video: $('[data-video]'),
  $videoClose: $('[data-video-close]'),
  strVideoParent: '[data-video-parent]',

  init: function () {
    this.$video.on('click', this.startVideo.bind(this));
    this.$videoClose.on('click', this.closeVideo.bind(this));
  },

  startVideo: function (ev) {
    ev.preventDefault();
    var $videoParent = $(ev.currentTarget).closest(this.strVideoParent);
    var $video = $videoParent.find('video');

    if ($video.length) {
      $videoParent.addClass('is-playing');
      $video[0].play();

      $video.on('ended', function () {
        setTimeout(function () {
          $videoParent.removeClass('is-playing');
        }, 1000);
      });
    }
  },

  closeVideo: function (ev) {
    ev.preventDefault();

    var $button = $(ev.currentTarget);
    var $videoParent = $button.closest(this.strVideoParent);
    var $video = $videoParent.find('video');

    if ($video.length) {
      $videoParent.removeClass('is-playing');
      $video[0].pause();
    }
  }
};

module.exports = VideoPlayer;
