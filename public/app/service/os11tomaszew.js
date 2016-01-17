'use strict';

rocket.register.service('os11tomaszew', function() {

  var menu = [];
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
    setUp : function () {
    }
  };
});
