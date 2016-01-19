'use strict';

rocket.register.service('tomaszewXP', function() {
  var menu = [
    {
      'name' : 'Tomaszew',
      'letter' : 't',
      'hash' : '#/tomaszew',
      'src' : '/media/tomaszew.jpg'
    },
    {
      'icon' : 'fa fa-users',
      'name' : 'Aula',
      'hash' : '#/aula',
      'letter' : 'a',
      'default' : true
    },
    {
      'icon' : 'fa fa-desktop',
      'name' : 'Ćwiczenia',
      'hash' : '#/cwiczenia',
      'letter' : 'c'
    },
    {
      'icon' : 'fa fa-book',
      'name' : 'Biblitoteka',
      'hash' : '#/biblioteka',
      'letter' : 'b'
    }
  ];

  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Wredne pytanie',
          'icon' : 'fa-exclamation-triangle fa-3x',
          'enabled' : false,
          'info' : '+1 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        },
        {
          'name' : 'Graj w WoW\'a',
          'icon' : 'fa fa-gamepad fa-3x',
          'enabled' : false,
          'info' : '+2 kodu',
          'click' : function () {
            rocket.service('engine').change({
              'kod' : 2
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'Kup megafon',
          'icon' : 'brak fa-3x',
          'enabled' : true,
          'koszt' : 100,
          'info' : 'Odblokowuje wredne pytanie',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'Wredne pytanie'
            });
          }
        },
        {
          'name' : 'Kup PC',
          'icon' : 'fa-cash fa-3x',
          'enabled' : true,
          'koszt' : 100,
          'info' : 'Odblokowuje grę w Wow\'a',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'Graj w WoW\'a'
            });
          }
        }
      ]
    },
    'c' : {
      'skills' : [
        {
          'name' : 'Prowadź zajęcia',
          'icon' : 'fa-graduation-cap fa-3x',
          'enabled' : false,
          'info' : '+2 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'Napisz niezrozumiałe zadania',
          'enabled' : true,
          'koszt' : 100,
          'info' : 'Pozwala na prowadzenie zajęć\'a',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'Prowadź zajęcia'
            });
          }
        }
      ]
    },
    'b' : {
      'skills' : [
        {
          'name' : 'Weź udział w hackatonie',
          'icon' : 'fa-book fa-3x',
          'enabled' : false,
          'info' : '+1 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 1
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'Naucz się dokumentacji',
          'koszt' : 100,
          'info' : 'Umożliwia udzial w hackatonie',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'Weź udział w hackatonie'
            });

          }
        }
      ]
    },
    't' : {
      'skills' : [
        {
          'name' : 'Hakuj sieć komórkową',
          'icon' : 'fa fa-mobile fa-3x',
          'enabled' : false,
          'info' : '+1 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'students' : 1
            });
          }
        },
        {
          'name' : 'Tomaszew 10',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : 'Zainstaluj nowy system',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'Kup Nokie 3310',
          'koszt' : 100,
          'info' : 'Umożliwia hakowanie sieci komórkowych',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'Hakuj sieć komórkową'
            });

          }
        },
        {
          'name' : 'Napisz magisterkę',
          'enabled' : true,
          'koszt' : 200,
          'info' : '+1 profit',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'Tomaszew 10',
              'profit' : 5
            });
          }
        }
      ]
    }
  }

  return {
    getSkills : function (letter) {
      return data[letter]['skills'];
    },
    getUpgrades : function (letter) {
      return data[letter]['upgrades'];
    },
    getMenu : function () {
      return menu;
    },
    upgrade : function (letter, name) {
      for (var i = 0, l = data[letter]['upgrades'].length; i < l; i++) {
        if (data[letter]['upgrades'][i]['unlock'] == name) {
          data[letter]['upgrades'][i]['enabled'] = false;
        }
      }
      for (var i = 0, l = data[letter]['skills'].length; i < l; i++) {
        if (data[letter]['skills'][i]['name'] == name) {
          data[letter]['skills'][i]['enabled'] = true;
        }
      }
    },
    setUp : function () {

    }
  };
});
