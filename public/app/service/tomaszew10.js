'use strict';

rocket.register.service('tomaszew10', function() {

  var menu = [
    {
      'name' : 'Tomaszew',
      'letter' : 't',
      'hash' : '#/tomaszew',
      'src' : 'media/tomaszew.jpg'
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
  var data = {};

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
