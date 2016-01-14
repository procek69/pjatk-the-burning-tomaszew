'use strict';

rocket.register.module('content/tomaszew', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('t', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('t', upgradesElement);

  return {
    constructor : function (){}
  }
});
