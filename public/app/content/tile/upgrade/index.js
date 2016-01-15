'use strict';

rocket.register.module('content/tile/upgrade', function (element, params) {

  element.querySelector('span').innerHTML = params.name;
  element.querySelector('i').innerHTML = params.koszt;

  element.addEventListener('click', params.click, true);

  return {
    constructor : function () {}
  }
});
