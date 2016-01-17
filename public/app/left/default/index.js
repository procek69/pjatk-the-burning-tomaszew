'use strict';

rocket.register.module("left/default", function(element, params) {

  var $start = element.querySelector('div.start');
  var $menu  = element.querySelector('div.menu');
  var flag = false;

  rocket.router.routeModuleHere(element.querySelector('div.top'));

  function show (e) {;
    flag = !flag;

    if (flag)
      $start.className += ' touch';
    else
      $start.className = 'start';
  }

  function hide(e) {
    $start.className = 'start';
  }

  function render(root, elem) {
    var a = document.createElement('a');
    a.setAttribute('href', elem['hash']);

    var x;
    if (elem['src']) {
      x = document.createElement('img');
      x.setAttribute('src', elem['src']);
    } else {
      x = document.createElement('i');
      x.className = elem['icon'];
    }

    a.appendChild(x);
    a.innerHTML += ' ' + elem['name'];
    root.appendChild(a);
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

      rocket.register.event('reloadMenu', function (menu) {
        while ($menu.firstChild) {
            $menu.removeChild($menu.firstChild);
        }

        for (var i = 0, l = menu.length; i < l; i++) {
          render($menu, menu[i]);
        }
      });
    }

  }
});
