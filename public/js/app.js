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

rocket.register.module('top', function (element, params) {

  return {
    constructor : function () {}
  }
});

'use strict';

rocket.register.service("engine", function () {

  var money = 0;
  var profit = 1;

  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Zrób studentów w balona',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true
        },
        {
          'name' : 'Ucz kodu',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true
        },
        {
          'name' : 'Poczuj pot studenta',
          'icon' : 'asd',
          'enabled' : true
        },
        {
          'name' : 'Zrób kolosa',
          'icon' : 'sdg',
          'enabled' : false
        },
        {
          'name' : 'Zrób egzamin',
          'icon' : 'sgsdg',
          'enabled' : false
        }
      ],
      'upgrades' : [
        {
          'name' : 'Nowy surface',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          afterBuy : function () {
            profit += 4;
          }
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
          'name' : 'update μJava',
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
          'name' : 'ŹLE!'
        },
        {
          'name' : 'Wredne pytanie'
        },
        {
          'name' : 'Daj wymagające zadania'
        },
        {
          'name' : 'Opowiadaj historię swojego życia'
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
          'name' : 'Załóż team na imaginecupa'
        },
        {
          'name' : 'Nakłoń Procka do kodu'
        },
        {
          'name' : 'Masteruj skille adeptów'
        }
      ],
      'upgrades' : [
        {
          'name' : 'Zrekrutuj Procka'
        },
        {
          'name' : 'Nowy sprzęt'
        },
        {
          'name' : 'Otwieranie drzwi aplikacją'
        }
      ]
    },
    't' : {
      'skills' : [],
      'upgrades' : [
        {
          'name' : 'Upgrade do Windows 8',
          'koszt' : 1000
        },
        {
          'name' : 'Upgrade do Windows 10',
          'koszt' : 500
        }
      ]
    }
  };

  function renderSkill (element, params) {

    var div = document.createElement('div');
    div.className = 'skill';

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

'use strict';

rocket.register.module("left/default", function(element, params) {
  return {
    constructor : function () {}

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
