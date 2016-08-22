'use strict';

var Tabs = {
  $tab: $('[data-tab]'),
  $tabTitle: $('[data-tab-title]'),
  $navButton: $('[data-tab-nav]'),

  /**
   * Inits tabs component
   * @public
   */
  init: function () {
    this.$tab.on('click', function (ev) {
      ev.preventDefault();
      $(ev.delegateTarget).tab('show');
    });

    this.$navButton.on('click', this.navigateTabs.bind(this));

    this.$tab.on('shown.bs.tab', this.updateTitle.bind(this));
    this.$tab.on('shown.bs.tab', this.controlVideo.bind(this));
    this.$tab.on('hidden.bs.tab', this.controlVideo.bind(this));
  },

  /**
   * Navigates tabs and switch to prev/next button
   * @private
   * @param {eventObject} ev - Event object
   */
  navigateTabs: function (ev) {
    ev.preventDefault();

    var $targetTab;
    var action = $(ev.currentTarget).data('tab-nav');
    var $tabs = $(ev.currentTarget).closest('.section').find(this.$tab);
    var $activeTab = $tabs.filter(function() { return $(this).parent('.active').length > 0; });

    // Find previous/next tab to select
    if ($activeTab.length) {
      var $targetElement = $activeTab.parent()[action]();

      if ($targetElement.length) {
        $targetTab = $targetElement.children();
      } else {
        if (action === 'prev') {
          $targetTab = $tabs.last();
        }

        if (action === 'next') {
          $targetTab = $tabs.first();
        }
      }

    // Target first tab if no tab is active
    } else {
      $targetTab = $tabs.first();
    }

    // Activate targeted tab
    if ($targetTab.length) {
      $targetTab.trigger('click');
    }
  },

  /**
   * Starts/pauses video when the tab is changed
   * @private
   * @param {eventObject} ev - Event object
   */
  controlVideo: function (ev) {
    var $activeTab = $(ev.currentTarget);
    var $video = $($activeTab.attr('href')).find('video');
    var action = ev.type === 'shown' ? 'play' : 'pause';

    if ($video.length) {
      $video[0][action]();
    }
  },

  /**
   * Updates tabs title when the tab is changed
   * @private
   * @param {eventObject} ev - Event object
   */
  updateTitle: function (ev) {
    var $activeTab = $(ev.currentTarget);
    var title = $activeTab.data('title');

    $activeTab.closest('.section').find(this.$tabTitle).text(title);
  }
};

module.exports = Tabs;
