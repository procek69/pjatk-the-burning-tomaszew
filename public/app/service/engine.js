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
          'name' : 'Czuj pot studenta',
          'icon' : 'asd',
          'enabled' : false
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
          'name' : 'Napisz kolosa',
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
      'skills' : []
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

  function renderSkill (element, name, icon) {

      var span = document.createElement('span'),
          p = document.createElement('p'),
          i = document.createElement('i'),
          div = document.createElement('div');

      span.innerHTML = name;
      div.className = 'double';
      i.className = icon;

      p.appendChild(i);
      div.appendChild(span);
      div.appendChild(p);
      element.appendChild(div);
  }

  function renderUpgrade (element, name, koszt) {
    var span = document.createElement('span'),
        p = document.createElement('p'),
        i = document.createElement('i'),
        div = document.createElement('div');

    span.innerHTML = name;
    div.className = 'double';
    i.innerHTML = koszt;

    p.appendChild(i);
    div.appendChild(span);
    div.appendChild(p);
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

        var name = skills[i]['name'];
        var icon = skills[i]['icon'];

        renderSkill(element, name, icon);

      }
    },
    renderUpgrades : function (letter, element) {
      var upgrades = data[letter]['upgrades'];

      for (var i = 0, l = upgrades.length; i < l; i++) {

        var name = upgrades[i]['name'];
        var koszt = upgrades[i]['koszt'];

        renderUpgrade(element, name, koszt);

      }

    }
  };
});
