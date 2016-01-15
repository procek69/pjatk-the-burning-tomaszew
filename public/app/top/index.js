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
