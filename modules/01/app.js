/*
  Project: VW
  Author: Xfive
 */

import $ from 'jquery';
import CarCarousel from './car-carousel';
import MenuScrollSlick from './menu-scroll-slick';
import CollapseRow from './collapse-row';
import Toggle from './toggle';
import MakeFixed from './make-fixed';

window.$ = window.jQuery = $;
window.ScrollMagic = require('scrollmagic');

require('./toggle-menu.js').init();
require('./back-to-top.js').init();
require('./select-menu.js').init();
require('./menu-scroll.js').init();
require('./form-validation.js').init();
require('./data-time-picker.js').init();
require('./scroll-to.js')();
require('./scroll-hightlight.js').init();

new CarCarousel();
new MenuScrollSlick();
new CollapseRow();
new Toggle();
new MakeFixed();
