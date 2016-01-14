'use strict';

rocket.register.service("engine", function () {

  var money = 0;
  var profit = 1;

  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Zrób studentów w balona',
          'icon' : 'fa fa-edge fa-3x'
        },
        {
          'name' : 'Ucz kodu',
          'icon' : 'fa fa-edge fa-3x'
        },
        {
          'name' : 'Czuj pot studenta',
          'icon' : 'asd'
        },
        {
          'name' : 'Zrób kolosa',
          'icon' : 'sdg'
        },
        {
          'name' : 'Zrób egzamin',
          'icon' : 'sgsdg'
        }
      ],
      'upgrades' : [
        {
          'name' : 'Nowy surface'
        },
        {
          'name' : 'Napisz kolosa'
        },
        {
          'name' : 'Napisz wredny egzamin'
        },
        {
          'name' : 'update μJava'
        },
        {
          'name' : 'Wredne pytania teoretyczne'
        },
        {
          'name' : 'Wredne zadanie na analizę'
        },
        {
          'name' : 'Wredne zadanie ze zmienną this'
        },
        {
          'name' : 'Nowe buty do tupania'
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
    }
  };
});
