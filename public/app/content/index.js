'use strict';

rocket.register.module('content', function (element, params) {


  var loadHere = element.querySelector(':scope > div');

  var upgradesElement = element.querySelector(':scope div.upgrades');
  var skillsElement = element.querySelector(':scope div.skills');

  var menu = rocket.service("win95").getMenu();

  function getLetter() {
    return window.location.hash[2];
  }

  function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
  }

  function load () {

    removeChildren(skillsElement);
    removeChildren(upgradesElement);

    rocket.service('engine').renderSkills(getLetter(), skillsElement);
    rocket.service('engine').renderUpgrades(getLetter(), upgradesElement);

    rocket.trigger('reloadMenu', menu);


  }

  for (var i = 0, l = menu.length; i < l; i++) {
    if (menu[i]['default']) {
      window.location.hash = menu[i]['hash'];
    }
  }

  window.addEventListener("hashchange", function (e) {
    load();
  });

  return {
    constructor: function () {
      load();
    }
  }
});
