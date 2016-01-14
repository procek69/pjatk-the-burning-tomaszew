'use strict';

rocket.register.module('content/cwiczenia', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('c', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('c', upgradesElement);

  return {
    constructor : function () {}
  }
});
