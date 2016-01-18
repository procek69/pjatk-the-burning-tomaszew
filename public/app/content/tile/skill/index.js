'use strict';

rocket.register.module('content/tile/skill', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible p > i').className = ['fa', params.icon].join(' ');
  element.querySelector('div.hidden p').innerHTML = params.info;


  if (!params.enabled) {
    element.className += ' disabled';
  }

  return {
    constructor : function () {
      var click = params.click;
      rocket.register.event('updateSkills', function(upgrade) {
        if (params.name === upgrade.name) {
          element.className = 'skill';
        }
      });
      element.addEventListener('click', function(e) {
        if (element.className != 'skill disabled') {
          click();
        }
      }, true);
    }
  }

});
