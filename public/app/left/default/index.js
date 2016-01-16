'use strict';

rocket.register.module("left/default", function(element, params) {

  var $start = element.querySelector('div.start');
  var flag = false;

  function show (e) {;
    flag = !flag;

    if (flag)
      $start.className += ' touch';
    else
      $start.className = 'start';
  }

  function hide(e) {
    console.log($start.className);
    $start.className = 'start';
    console.log($start.className);
  }

  $start.addEventListener('click', show, false);

  return {
    constructor : function () {
      rocket.register.event('updateMoney', function(money) {
        //$this.update(money);
      });

      rocket.register.event('updateStudents', function (students) {
        //$this.updateStudents(students);
      });

      rocket.register.event('updateProfit', function (profit) {
        //$this.updateProfit(profit);
      });
    }

  }
});
