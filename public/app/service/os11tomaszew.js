'use strict';

rocket.register.service('os11tomaszew', function() {

  var menu = [
    {
      'name' : 'Tomaszew',
      'letter' : 't',
      'hash' : '#/tomaszew',
      'src' : '/media/tomaszew.jpg',
      'callback' : function () {
        document.body.className = 'os11tomaszew tomaszew';
      }
    },
    {
      'icon' : 'fa fa-users',
      'name' : 'Nie Aula',
      'hash' : '#/aula',
      'letter' : 'a',
      'default' : true,
      'callback' : function () {
        document.body.className = 'os11tomaszew aula';
      }
    },
    {
      'icon' : 'fa fa-desktop',
      'name' : 'Ćwiczenia',
      'hash' : '#/cwiczenia',
      'letter' : 'c',
      'callback' : function () {
        document.body.className = 'os11tomaszew cwiczenia';
      }
    },
    {
      'icon' : 'fa fa-book',
      'name' : 'Biblitoteka',
      'hash' : '#/biblioteka',
      'letter' : 'b',
      'callback' : function () {
        document.body.className = 'os11tomaszew biblioteka';
      }
    }
  ];

  var data = {
    'a' : {
      'skills' : [],
      'upgrades' : []
    },
    'c' : {
      'skills' : [],
      'upgrades' : []
    }
  };

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
    setUp : function () {
    }
  };
});
