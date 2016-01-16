'use strict';

rocket.register.service('win95', function() {
  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'źle!',
          'icon' : 'fa-exclamation-triangle',
          'enabled' : true,
          'info' : '+1 kod',
          'click' : function () {
            console.log('elo');
          }
        },
        {
          'name' : 'graj w pasjansa online',
          'icon' : 'fa-play',
          'enabled' : false,
          'info' : '+1 studentów',
          'click' : function () {
            console.log('elo');
          }
        },
        {
          'name' : 'asystuj profesorowi',
          'icon' : 'fa-play',
          'enabled' : true,
          'info' : '+10 kodu',
          'click' : function () {
            console.log('elo');
          }
        },
        {
          'name' : 'czytaj dokumentację',
          'icon' : 'fa-play',
          'enabled' : true,
          'info' : '+10 kodu',
          'click' : function () {
            console.log('elo');
          }
        },
        {
          'name' : 'weź udział w konkusie',
          'icon' : 'fa-play',
          'enabled' : true,
          'info' : '+10 kodu',
          'click' : function () {
            console.log('elo');
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'kup modem',
          'icon' : 'brak',
          'enabled' : true,
          'koszt' : 100,
          'opis' : 'umożliwia granie w pasjansa online',
          'click' : function (e) {
          }
        },
        {
          'name' : 'pracuj nad microJava',
          'icon' : 'fa-play',
          'enabled' : true,
          'koszt' : 100,
          'info' : '+1 profit',
          'click' : function () {
            console.log('elo');
          }
        },
      ]
    },
    'c' : {
      'skills' : [],
      'upgrades' : []
    },
    's' : {
      'skills' : [],
      'upgrades' : []
    },
    't' : {
      'skills' : [],
      'upgrades' : []
    }
  }

  return {
    getSkills : function (letter) {
      return data[letter]['skills'];
    },
    getUpgrades : function (letter) {
      return data[letter]['upgrades'];
    }
  }
});
