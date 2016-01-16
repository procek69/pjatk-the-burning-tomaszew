'use strict';

rocket.register.module('content/aula', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('a', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('a', upgradesElement);

  return {
    constructor : function () {
    }
  }
});
