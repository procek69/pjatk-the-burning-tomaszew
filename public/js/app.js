'use strict';

rocket.register.module('content', function (element, params) {


  var loadHere = element.querySelector(':scope > div');


  function load (letter) {
    var toLoad;
    switch (letter) {
      case 't':
        toLoad = 'tomaszew';
        break;
      case 'a':
        toLoad = 'aula';
        break;
      case 'c':
        toLoad = 'cwiczenia';
        break;
      case 's':
        toLoad = 's9';
        break;
    }

    element.className = toLoad;
    rocket.router.loadModuleIntoElement(['content', toLoad].join('/'), loadHere, {});
  }

  window.addEventListener("hashchange", function (e) {
    //rocket.router.loadModuleIntoElement(window.location.hash[2], elemen);
    load(window.location.hash[2]);
  });
  window.location.hash = '#/aula';

  return {
    constructor: function () {
      load(window.location.hash[2]);
    }
  }
});

'use strict';

rocket.register.service("engine", function () {

  function updateValues() {
    rocket.trigger('updateMoney', money);
    rocket.trigger('updateStudents', students);
    rocket.trigger('updateProfit', profit);
  }

  function updateSkills(params) {
    rocket.trigger('updateSkills', params);
  }

  function parse(name, def) {
    var value = parseInt(localStorage.getItem(name));
    if (value === NaN || value === null) {
      localStorage.setItem(name, def);
      return def;
    } else return value;
  }

  var money = parse('money', 0);
  var profit = parse('profit', 1);
  var students = parse('students', 20);

  function tryUpgrade(e) {
    var $parent = e.srcElement.parentNode;

    if ($parent.className == 'upgrade green')
      return false;

    $parent.className += ' green';

    var $i = $parent.querySelector('i');
    $i.innerHTML = '';
    $i.className = 'fa fa-check';

    return true;
  }

  function upgrade(e, values) {

    if (!tryUpgrade(e)) return;

    var cost = values['money'];
    var student = values['students'];
    var prof = values['profit'];

    if (cost != undefined) {
      if (money < cost) {
        return;
      }
      money -= cost;
    }

    if (student != undefined) {
      if (students < student) {
        return;
      }
      students -= student;
    }

    if (prof != undefined) {
      profit += prof;
    }

    var callback = values['callback'];
    if (callback != undefined) callback();

    updateValues();
    updateSkills({
      'name' : values['name'],
    });


  };

  var skillsPower = {
    'zle' : 10,
    'tupanie' : 0,
    'procek69' : false
  };

  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Ucz kodu',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          click : function () {

            if(money < 10) return;

            money -= 10;
            students += 2;

            updateValues();
          }
        },
        {
          'name' : 'Prowadź wykład',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true,
          click : function () {

            if (money < 100) return;

            money -= 100;
            students += 25;

            updateValues();
          }

        },
        {
          'name' : 'Streamuj WoW\'a',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true,
          'click' : function () {
            students += 10;
            updateValues();
          }
        },
        {
          'name' : 'Wstaw wykłady',
          'icon' : 'fa fa-edge fa-3x',
          'enabled' : true,
          'click' : function () {
            students += 100;
            updateValues();
          }
        },
        {
          'name' : 'Zrób studentów w balona',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          'click' : function () {
            if (students < 100) return;

            students -= 100;
            profit += 1;

            updateValues();
          }
        },
        {
          'name' : 'Zrób kolosa',
          'icon' : 'fa fa-book fa-2x',
          'enabled' : false,
          'click' : function () {
            if (student < 100) return;

            students -= 100;
            money += 500;

            updateValues();
          }
        },
        {
          'name' : 'Zrób egzamin',
          'icon' : 'fa fa-calendar-o fa-2x',
          'enabled' : false,
          'click' : function () {
            if (students < 200) return;

            students -= 200;
            profit += 5;

            updateValues();
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'Stwórz kolosa',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          'click' : function (e) {

            upgrade(e, {
              'name' : 'Zrób kolosa',
              'money' : 100
            });

          }
        },
        {
          'name' : 'Napisz wredny egzamin',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          'click' : function (e) {

            upgrade(e, {
              'name' : 'Zrób egzamin',
              'money' : 100
            });
          }
        },
        {
          'name' : 'Wredne pytania teoretyczne',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 100,
              'callback' : function () {
                  skillsPower['tupanie'] += 20;
              }
            });
          }
        },
        {
          'name' : 'Wredne zadanie na analizę',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 100,
              'callback' : function () {
                skillsPower['tupanie'] += 20;
              }
            });
          }
        },
        {
          'name' : 'Wredne zadanie ze zmienną this',
          'icon' : 'brak',
          'enabled' : false,
          'koszt' : 100,
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 100,
              'callback' : function () {
                skillsPower['tupanie'] += 20;
              }
            });
          }
        }
      ]
    },
    'c' : {
      'skills' : [
        {
          'name' : 'ŹLE!',
          'icon' : 'fa fa-frown-o fa-2x',
          'enabled' : true,
          'click' : function (e) {
            if (money < 10) return;
            if (students < 1) return;

            money += skillsPower['zle'];
            students -= 1;

            updateValues();
          }
        },
        {
          'name' : 'Wredne pytanie',
          'icon' : 'fa fa-question fa-2x',
          'enabled' : true,
          'click' : function (e) {
            if (money < 10) return;
            if (students < 1) return;

            money += 2*skillsPower['zle'];
            students -= 1;

            updateValues();
          }
        },
        {
          'name' : 'Opowiadaj historię swojego życia',
          'icon' : 'fa fa-commenting-o fa-2x',
          'enabled' : true,
          'click' : function (e) {

            students++;

            updateValues();
          }
        },
        {
          'name' : 'Daj wymagające zadania',
          'icon' : 'fa fa-cubes fa-2x',
          'enabled' : true,
          'click' : function (e) {
            if (students < 10) return;

            money += 50;
            students -= 10;

            updateValues();
          }
        },
        {
          'name' : 'Zadaj projekt',
          'icon' : 'brak',
          'enabled' : true,
          'click' : function (e) {
            if (students < 25) return;

            money += 400;
            students -= 25;

            updateValues();
          }
        },
        {
          'name' : 'Poczuj pot studenta',
          'icon' : 'fa fa-male fa-2x',
          'enabled' : true,
          'click' : function (e) {
            if (money < 10) return;
            if (students < 1) return;

            money += 2*skillsPower['zle'];
            students -= 1;

            updateValues();
          }
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
          'name' : 'zabezpiecz sharepoint',
          'koszt' : 0,
          'click' : function (e) {
            if (prompt('00010101 01110010 0100010 0001001?') == 'tak') {
              alert('procek69 i tak już go panował');
            }
          }
        }
      ]
    },
    's' : {
      'skills' : [
        {
          'name' : 'Załóż team na imaginecupa',
          'icon' : 'fa fa-users fa-2x'
        },
        {
          'name' : 'Nakłoń Procka do kodu',
          'icon' : 'fa fa-terminal fa-2x'
        },
        {
          'name' : 'Masteruj skille adeptów',
          'icon' : 'fa fa-spinner fa-2x'
        }
      ],
      'upgrades' : [
        {
          'name' : 'Zrekrutuj Procka',
          'koszt' : 69000,
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 69000,
              'profit' : 6900,
              'callback' : function () {
                skillsPower['procek69'] = true;
              }
            });
          }
        },
        {
          'name' : 'Nowy sprzęt',
          'koszt' : 10000,
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 10000,
              'proft' : 200
            });
          }
        },
        {
          'name': 'Otwieranie drzwi aplikacją',
          'koszt' : 1000,
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 10000,
              'profit' : 100
            });
          }
        }
      ]
    },
    't' : {
      'skills' : [],
      'upgrades' : [
        {
          'name' : 'Kup megafon',
          'koszt' : 200,
          'click' : function (e) {
            upgrade(e, {
              'name' : 'Zrób kolosa',
              'money' : 200,
              'callback' : function () {
                skillsPower['zle'] *= 2;
              }
            });
          }
        },
        {
          'name' : 'update μJava',
          'koszt' : 1000,
          'click' : function (e) {
            upgrade(e, {
              'money' : 1000,
              'profit' : 5
            });
          }
        },
        {
          'name' : 'nowy surface',
          'koszt' : 1000,
          'click' : function (e) {
            upgrade(e, {
              'money' : 1000,
              'profit' : 5
            });
          }
        },
        {
          'name' : 'nowe buty do tupania',
          'koszt' : 1000,
          'click' : function (e) {
            upgrade(e, {
              'money' : 1000,
              'profit' : 5,
              'callback' : function () {
                skillsPower['tupanie'] += 10;
              }
            });
          }
        },
        {
          'name' : 'Upgrade do Windows 8',
          'koszt' : 1000,
          'click' : function (e) {
            upgrade(e, {
              'money' : 1000,
              'profit' : 10
            });
          }
        },
        {
          'name' : 'Upgrade do Windows 10',
          'koszt' : 500,
          'click' : function (e) {
            upgrade(e, {
              'money' : 1000,
              'profit' : 10
            });
          }
        },
        {
          'name' : 'stwórz Sharepoint',
          'koszt' : 1000,
          'click' : function (e) {
            upgrade(e, {
              'money' : 1000,
              'profit' : 10
            });
          }
        }
      ]
    }
  };

  function renderSkill (element, params) {

    var div = document.createElement('div');
    div.className = 'skill double';

    rocket.router.loadModuleIntoElement('content/tile/skill', div, params);

    element.appendChild(div);
  }

  function renderUpgrade (element, params) {

    var div = document.createElement('div');
    div.className = 'upgrade';

    rocket.router.loadModuleIntoElement('content/tile/upgrade', div, params);

    element.appendChild(div);

  }

  return {
    calc : function () {
      money += profit;
      updateValues();
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

        renderSkill(element, skills[i]);

      }
    },
    renderUpgrades : function (letter, element) {
      var upgrades = data[letter]['upgrades'];

      for (var i = 0, l = upgrades.length; i < l; i++) {

        renderUpgrade(element, upgrades[i]);

      }

    }
  };
});

setInterval(rocket.service("engine").calc, 1000);

'use strict';

rocket.register.module('top', function (element, params) {

  var $money;
  var $students;
  var $profit;

  return {
    constructor : function () {
      var $this = this;
      $this.setup();

      rocket.register.event('updateMoney', function(money) {
        $this.update(money);
      });

      rocket.register.event('updateStudents', function (students) {
        $this.updateStudents(students);
      });

      rocket.register.event('updateProfit', function (profit) {
        $this.updateProfit(profit);
      });

    },
    update : function(money) {
      $money.innerHTML = money;
      localStorage.setItem('money', money);
    },
    updateStudents : function (students) {
      $students.innerHTML = students;
      localStorage.setItem('students', students);
    },
    updateProfit : function (profit) {
      $profit.innerHTML = ['(+', profit, '/s)'].join('');
      localStorage.setItem('proft', profit);

    },
    setup : function () {
      $students = element.querySelector('p:nth-child(1) > span');
      $money    = element.querySelector('p:nth-child(2) > span');
      $profit   = element.querySelector('p:nth-child(2) > i');
    }
  }
});

'use strict';

rocket.register.module('content/aula', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('a', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('a', upgradesElement);

  return {
    constructor : function () {}
  }
});

'use strict';

rocket.register.module('content/cwiczenia', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('c', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('c', upgradesElement);

  return {
    constructor : function () {}
  }
});

'use strict';

rocket.register.module('content/s9', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('s', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('s', upgradesElement);

  return {
    constructor : function () {}
  }
});

'use strict';

rocket.register.module('content/tomaszew', function(element, params) {

  var skillsElement = element.querySelector(':scope > div.skills');
  rocket.service('engine').renderSkills('t', skillsElement);

  var upgradesElement = element.querySelector(':scope > div.upgrades');
  rocket.service('engine').renderUpgrades('t', upgradesElement);

  return {
    constructor : function (){}
  }
});

'use strict';

rocket.register.module("left/default", function(element, params) {
  return {
    constructor : function () {}

  }
});

'use strict';

rocket.register.module('content/tile/skill', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible p > i').className = params.icon;
  element.querySelector('div.hidden p').innerHTML = params.info;

  if (!params.enabled) {
    element.className += ' disabled';
  }

  element.addEventListener('click', params.click, true);

  return {
    constructor : function () {
      rocket.register.event('updateSkills', function(upgrade) {
        if (params.name === upgrade.name) {
          element.className = 'double';
        }
      });
    }
  }

});

'use strict';

rocket.register.module('content/tile/upgrade', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible i').innerHTML = params.koszt;
  element.querySelector('div.hidden p').innerHTML = params.info;

  element.addEventListener('click', params.click, true);

  return {
    constructor : function () {}
  }
});
