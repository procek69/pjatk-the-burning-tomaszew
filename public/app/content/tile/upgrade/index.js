'use strict';

rocket.register.module('content/tile/upgrade', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible i').innerHTML = [params.koszt, 'kodu'].join(' ');
  element.querySelector('div.hidden p').innerHTML = params.info;

  element.addEventListener('click', params.click, true);

  return {
    constructor : function () {}
  }
});
