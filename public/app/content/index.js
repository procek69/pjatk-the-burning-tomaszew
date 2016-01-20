'use strict';

rocket.register.module('content', function (element, params) {

  var loadHere = element.querySelector(':scope > div');

  var upgradesElement = element.querySelector(':scope div.upgrades');
  var skillsElement = element.querySelector(':scope div.skills');

  var menu = rocket.service("engine").getMenu();

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

  }

  for (var i = 0, l = menu.length; i < l; i++) {
    if (menu[i]['default']) {
      window.location.hash = menu[i]['hash'];
    }
  }

  //rocket.trigger('loadLvl', function () {});


  return {
    constructor: function () {
      window.addEventListener("hashchange", function (e) {
        load();
        var menu = rocket.service("engine").getMenu();
        var letter = getLetter();
        for (var i = 0, l = menu.length; i < l; i++) {
          if (menu[i]['letter'] == letter) {
            var f = menu[i]['callback'];
            console.log(f);
            if (f != undefined) {
              f();
            }
          }
        }
      });

      rocket.service("engine").setAfter(function () {
        load();
      });

      load();
    }
  }
});
