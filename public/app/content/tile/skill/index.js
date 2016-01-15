'use strict';

rocket.register.module('content/tile/skill', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible p > i').className = params.icon;
  element.querySelector('div.hidden p').innerHTML = params.info;

  if (!params.enabled) {
    element.className += ' disabled';
  }

  element.addEventListener('click', params.click, true);

  return {
    constructor : function () {
      rocket.register.event('updateSkills', function(upgrade) {
        if (params.name === upgrade.name) {
          element.className = 'double';
        }
      });
    }
  }

});
