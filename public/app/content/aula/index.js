'use strict';

rocket.register.module('content/aula', function(element, params) {


  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service("engine").renderSkills('a', skillsElement);


  return {
    constructor : function () {}
  }
});
