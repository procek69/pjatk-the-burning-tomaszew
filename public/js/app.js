'use strict';

rocket.register.module('content', function (element, params) {


  var loadHere = element.querySelector(':scope > div');


  function load (letter) {
    var toLoad;
    switch (letter) {
      case 't':
        toLoad = 'tomaszew';
        break;
      case 'a':
        toLoad = 'aula';
        break;
      case 'c':
        toLoad = 'cwiczenia';
        break;
      case 's':
        toLoad = 's9';
        break;
    }

    element.className = toLoad;
    rocket.router.loadModuleIntoElement(['content', toLoad].join('/'), loadHere, {});
  }



  window.addEventListener("hashchange", function (e) {
    //rocket.router.loadModuleIntoElement(window.location.hash[2], elemen);
    load(window.location.hash[2]);
  });
  window.location.hash = '#/aula';

  return {
    constructor: function () {
      load(window.location.hash[2]);
    }
  }
});

'use strict';

rocket.register.service("engine", function () {

  var money = 0;
  var profit = 1;
  var students = 20;

  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Ucz kodu',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Prowadź wykład',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true
        },
        {
          'name' : 'Streamuj WoW\'a',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true
        },
        {
          'name' : 'Wstaw wykłady',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true
        },
        {
          'name' : 'Zrób studentów w balona',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Zrób kolosa',
          'icon' : 'fa fa-book fa-2x',
          'enabled' : false
        },
        {
          'name' : 'Zrób egzamin',
          'icon' : 'fa fa-calendar-o fa-2x',
          'enabled' : false
        }
      ],
      'upgrades' : [
        {
          'name' : 'Kup megafon',
          'koszt' : 200
        },
        {
          'name' : 'Stwórz kolosa',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          afterBuy : function () {
            data['a']['skills'][3].enabled = true;
          }
        },
        {
          'name' : 'Napisz wredny egzamin',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100
        },
        {
          'name' : 'Wredne pytania teoretyczne',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100
        },
        {
          'name' : 'Wredne zadanie na analizę',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100
        },
        {
          'name' : 'Wredne zadanie ze zmienną this',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100
        },
        {
          'name' : 'Nowe buty do tupania',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100
        }
      ]
    },
    'c' : {
      'skills' : [
        {
          'name' : 'ŹLE!',
          'icon' : 'fa fa-frown-o fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Wredne pytanie',
          'icon' : 'fa fa-question fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Opowiadaj historię swojego życia',
          'icon' : 'fa fa-commenting-o fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Daj wymagające zadania',
          'icon' : 'fa fa-cubes fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Zadaj projekt',
          'icon' : 'brak',
          'enabled' : true
        },
        {
          'name' : 'Poczuj pot studenta',
          'icon' : 'fa fa-male fa-2x',
          'enabled' : true
        }

      ],
      'upgrades' : [
        {
          'name' : 'Zainstaluj Windows 10'
        },
        {
          'name' : 'Stwórz galerię na sharepoint'
        },
        {
          'name' : 'SPRÓBUJ zabezpieczyć sharepoint'
        }
      ]
    },
    's' : {
      'skills' : [
        {
          'name' : 'Załóż team na imaginecupa',
          'icon' : 'fa fa-users fa-2x'
        },
        {
          'name' : 'Nakłoń Procka do kodu',
          'icon' : 'fa fa-terminal fa-2x'
        },
        {
          'name' : 'Masteruj skille adeptów',
          'icon' : 'fa fa-spinner fa-2x'
        }
      ],
      'upgrades' : [
        {
          'name' : 'Zrekrutuj Procka',
          'koszt' : 69000
        },
        {
          'name' : 'Nowy sprzęt',
          'koszt' : 10000
        },
        {
          'name': 'Otwieranie drzwi aplikacją',
          'koszt' : 1000
        }
      ]
    },
    't' : {
      'skills' : [],
      'upgrades' : [
        {
          'name' : 'update μJava',
          'koszt' : 1000
        },
        {
          'name' : 'nowy surface',
          'koszt' : 1000
        },
        {
          'name' : 'nowe buty do tupania',
          'koszt' : 1000
        },
        {
          'name' : 'Upgrade do Windows 8',
          'koszt' : 1000
        },
        {
          'name' : 'Upgrade do Windows 10',
          'koszt' : 500
        },
        {
          'name' : 'stwórz Sharepoint',
          'koszt' : 1000
        }
      ]
    }
  };

  function renderSkill (element, params) {

    var div = document.createElement('div');
    div.className = 'skill double';

    rocket.router.loadModuleIntoElement('content/tile/skill', div, params);

    element.appendChild(div);
  }

  function renderUpgrade (element, params) {

    var div = document.createElement('div');
    div.className = 'upgrade';

    rocket.router.loadModuleIntoElement('content/tile/upgrade', div, params);

    element.appendChild(div);

  }

  return {
    calc : function () {
      money += profit;
      rocket.trigger("updateMoney", money);
    },
    getMoney : function () {
      return money;
    },
    getProfit : function () {
      return profit;
    },
    getSkills : function (letter) {
      return data[letter]['skills'];
    },
    getUpgrades : function (letter) {
      return data[letter]['upgrades'];
    },
    renderSkills : function (letter, element) {

      var skills = data[letter]['skills'];

      for (var i = 0, l = skills.length; i < l; i++) {

        renderSkill(element, skills[i]);

      }
    },
    renderUpgrades : function (letter, element) {
      var upgrades = data[letter]['upgrades'];

      for (var i = 0, l = upgrades.length; i < l; i++) {

        renderUpgrade(element, upgrades[i]);

      }

    }
  };
});

setInterval(rocket.service("engine").calc, 1000);

'use strict';

rocket.register.module('top', function (element, params) {

  var $money;

  return {
    constructor : function () {
      var $this = this;
      $this.setup();

      rocket.register.event("updateMoney", function(money) {
        $this.update(money);
      });
    },
    update : function(money) {
      $money.innerHTML = money;
    },
    setup : function () {
      $money = element.querySelector('p:nth-child(2) > span');
    }
  }
});

'use strict';

rocket.register.module('content/aula', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('a', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('a', upgradesElement);

  return {
    constructor : function () {}
  }
});

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

'use strict';

rocket.register.module("left/default", function(element, params) {
  return {
    constructor : function () {}

  }
});

'use strict';

rocket.register.module('content/tile/skill', function (element, params) {

  element.querySelector('span').innerHTML = params.name;
  element.querySelector('p > i').className = params.icon;

  return {
    constructor : function () {}
  }

});

'use strict';

rocket.register.module('content/tile/upgrade', function (element, params) {

  element.querySelector('span').innerHTML = params.name;
  element.querySelector('i').innerHTML = params.koszt;

  return {
    constructor : function () {}
  }
});
