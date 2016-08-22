'use strict';

var $ = require('jquery');

var greeting = function (name) {
  $('.js-greeting').text(name);
  console.log('Works');
};

module.exports = greeting;
