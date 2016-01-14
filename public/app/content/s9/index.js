'use strict';

rocket.register.module('content/s9', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('s', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('s', upgradesElement);

  return {
    constructor : function () {}
  }
});
