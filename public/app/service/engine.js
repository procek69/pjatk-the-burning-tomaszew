'use strict';

rocket.register.service("engine", function () {

  var money = 0;
  var profit = 1;

  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Zrób studentów w balona',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Ucz kodu',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true
        },
        {
          'name' : 'Poczuj pot studenta',
          'icon' : 'fa fa-male fa-2x',
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
          'name' : 'ŹLE!',
		  'icon' : 'fa fa-frown-o fa-2x'
        },
        {
          'name' : 'Wredne pytanie',
		  'icon' : 'fa fa-question fa-2x'
        },
        {
          'name' : 'Daj wymagające zadania',
		  'icon' : 'fa fa-cubes fa-2x'
        },
        {
          'name' : 'Opowiadaj historię swojego życia',
		  'icon' : 'fa fa-commenting-o fa-2x'
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
