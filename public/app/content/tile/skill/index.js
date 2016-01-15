'use strict';

rocket.register.module('content/tile/skill', function (element, params) {

  element.querySelector('span').innerHTML = params.name;
  element.querySelector('p > i').className = params.icon;

  if (!params.enabled) {
    element.className += ' disabled';
  }

  element.addEventListener('click', params.click, true);

  return {
    constructor : function () {}
  }

});
