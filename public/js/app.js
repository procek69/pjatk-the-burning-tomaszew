'use strict';

rocket.register.module('content', function (element, params) {

  var loadHere = element.querySelector(':scope > div');

  var upgradesElement = element.querySelector(':scope div.upgrades');
  var skillsElement = element.querySelector(':scope div.skills');

  rocket.service("engine").nextLvl();

  var menu = rocket.service("engine").getMenu();

  function getLetter() {
    return window.location.hash[2];
  }

  function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
  }

  function load () {

    removeChildren(skillsElement);
    removeChildren(upgradesElement);

    rocket.service('engine').renderSkills(getLetter(), skillsElement);
    rocket.service('engine').renderUpgrades(getLetter(), upgradesElement);

  }

  for (var i = 0, l = menu.length; i < l; i++) {
    if (menu[i]['default']) {
      window.location.hash = menu[i]['hash'];
    }
  }

  window.addEventListener("hashchange", function (e) {
    load();
    var menu = rocket.service("engine").getMenu();
    var letter = getLetter();
    for (var i = 0, l = menu.length; i < l; i++) {
      if (menu[i]['letter'] == letter) {
        var f = menu[i]['callback'];
        console.log(f);
        if (f != undefined) {
          f();
        }
      }
    }

  });

  //rocket.trigger('loadLvl', function () {});


  return {
    constructor: function () {
      load();
      rocket.service("engine").setAfter(function () {
        load();
      });
    }
  }
});

'use strict';

rocket.register.service("engine", function () {

  function parse(name, def) {
    var value = parseInt(localStorage.getItem(name));
    if (isNaN(value) || value === null) {
      localStorage.setItem(name, def);
      return def;
    } else return value;
  }

  var money = parse('money', 0);
  var profit = parse('profit', 1);
  var students = parse('students', 20);
  var lvl = '';
  var time = parse('time', 90*60);
  var after = null;

  function updateValues() {
    rocket.trigger('updateMoney', money);
    rocket.trigger('updateStudents', students);
    rocket.trigger('updateProfit', profit);
    rocket.trigger('updateTime', time);
  }

  function updateSkills(params) {
    rocket.trigger('updateSkills', params);
  }

  function upgrade(e, values) {

    var cost = values['koszt'] || 0;
    var student = values['students'] || 0;
    var prof = values['profit'] || 0;

    if (money - cost < 0) {
      return;
    }
    money -= cost;


    if (students - student < 0) {
      return;
    }

    students -= student;
    profit += prof;

    var callback = values['callback'];
    if (callback != undefined) callback();

    rocket.service(lvl).upgrade(window.location.hash[2], values['name']);

    e.parentNode.removeChild(e);

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

  function renderSkill (element, params) {

    var div = document.createElement('div');
    div.className = 'skill';

    rocket.router.loadModuleIntoElement('content/tile/skill', div, params);

    element.appendChild(div);
  }

  function renderUpgrade (element, params) {

    var div = document.createElement('div');
    div.className = 'upgrade';

    var enabled = params['enabled'] || true;

    if (enabled) {
      console.log('bede rysyowal: ', params);
      rocket.router.loadModuleIntoElement('content/tile/upgrade', div, params);
    }

    element.appendChild(div);

  }

  return {
    calc : function () {

      time--;
      money += profit;
      updateValues();
    },
    loadLvl : function () {
      rocket.service(lvl).setUp();
      document.body.className = lvl;
    },
    getLvl : function () {
      return lvl;
    },
    getMoney : function () {
      return money;
    },
    getProfit : function () {
      return profit;
    },
    getTime : function () {
      return time;
    },
    getMenu : function () {
      return rocket.service(lvl).getMenu();
    },
    nextLvl : function () {
      switch (lvl) {
        case '':
          lvl = 'tomaszew95';
          break;
        case 'tomaszew95':
          lvl = 'tomaszewXP';
          break;
        case 'tomaszewXP':
          lvl = 'tomaszew10';
          break;
        case 'tomaszew10':
          lvl = 'os11tomaszew';
          break;
      }
      rocket.trigger('reloadMenu', this.getMenu());
      this.loadLvl(lvl);
      if (after != null) after();
    },
    setAfter : function (f) {
      after = f;
    },
    getSkills : function (letter) {
      return rocket.service(lvl).getSkills(letter);
    },
    getUpgrades : function (letter) {
      return rocket.service(lvl).getUpgrades(letter);
    },
    change : function (params) {

      var m = params['money'] || 0;
      var s = params['students'] || 0;
      var p = params['profit'] || 0;
      var t = params['time'] || 0;

      console.log('money', m);
      console.log('students', s);
      console.log('profit', p);

      //przypadek braku hajsu lub studentów
      if (money + m < 0 || students + s < 0) {
        return;
      }

      profit += p;
      students += s;
      money += m;
      time += t;

      updateValues();
    },
    'upgrade' : upgrade,
    renderSkills : function (letter, element) {

      var skills = this.getSkills(letter);

      for (var i = 0, l = skills.length; i < l; i++) {

        renderSkill(element, skills[i]);

      }
    },
    renderUpgrades : function (letter, element) {
      var upgrades = this.getUpgrades(letter);

      for (var i = 0, l = upgrades.length; i < l; i++) {

        renderUpgrade(element, upgrades[i]);

      }

    }
  };
});

setInterval(rocket.service("engine").calc, 1000);

'use strict';

rocket.register.service('os11tomaszew', function() {

  var menu = [
    {
      'name' : '',
      'letter' : 't',
      'hash' : '#/tomaszew',
      'src' : 'media/tomaszew.jpg',
      'callback' : function () {
        document.body.className = 'os11tomaszew tomaszew'
      }
    },
    {
      'icon' : 'fa fa-users',
      'name' : '',
      'hash' : '#/aula',
      'letter' : 'a',
      'default' : true,
      'callback' : function () {
        document.body.className = 'os11tomaszew aula'
      }
    },
    {
      'icon' : 'fa fa-desktop',
      'name' : '',
      'hash' : '#/cwiczenia',
      'letter' : 'c',
      'callback' : function () {
        document.body.className = 'os11tomaszew cwiczenia'
      }
    },
    {
      'icon' : 'fa fa-book',
      'name' : '',
      'hash' : '#/s9',
      'letter' : 'b',
      'callback' : function () {
        document.body.className = 'os11tomaszew s9'
      }
    }
  ];
  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'źle!',
          'icon' : 'fa-exclamation-triangle fa-3x',
          'enabled' : true,
          'info' : '+1 kod',
          'time' : 1,
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2,
              'time' : 1
            });
          }
        },
        {
          'name' : 'słuchaj wykładu',
          'icon' : 'fa-graduation-cap fa-3x',
          'enabled' : true,
          'info' : '+2 kodu',
          'click' : function () {
            rocket.service('engine').change({
              'kod' : 2
            });
          }
        },
        {
          'name' : 'nie sluchaj wykladu',
          'icon' : 'fa-graduation-cap fa-3x',
          'enabled' : false,
          'info' : '+1 student',
          'click' : function () {
            rocket.service('engine').change({
              'students' : 1
            });
          }
        },
        {
          'name' : 'asystuj profesorowi',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+1 profit',
          'click' : function () {
            console.log('elo');
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'kup sluchawki',
          'icon' : 'brak fa-3x',
          'enabled' : true,
          'koszt' : 100,
          'opis' : 'na co komu wyklad?',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'nie sluchaj wykladu'
            });
          }
        },
        {
          'name' : 'namow profesora na wyklad',
          'icon' : 'fa-cash fa-3x',
          'enabled' : true,
          'koszt' : 100,
          'opis' : 'zacznij prowadzic wyklady',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'asystuj profesorowi'
            });
          }
        }
      ]
    },
    'c' : {
      'skills' : [
        {
          'name' : 'rob zadania',
          'icon' : 'fa-tasks fa-3x',
          'enabled' : true,
          'info' : '+2 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        },
        {
          'name' : 'pomoz kodzic znajomemu',
          'icon' : 'fa-medkit fa-3x',
          'enabled' : true,
          'info' : '-2 kod&+1 student',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        },
        {
          'name' : 'wytknij blad prowadzacemu',
          'icon' : 'fa-comment fa-3x',
          'enabled' : true,
          'info' : '-10 kod&+2 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'money' : -10,
              'students' : 2
            });
          }
        },
      ],
      'upgrades' : []
    },
    'b' : {
      'skills' : [
        {
          'name' : 'czytaj dokumentację',
          'icon' : 'fa-book fa-3x',
          'enabled' : true,
          'info' : '+1 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 1
            });
          }
        },
        {
          'name' : 'wez udzial w konkusie',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+1 profit&-5 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'profit' : 1,
              'students' : -5
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'naucz sie kompilatora na pamiec',
          'koszt' : 100,
          'info' : 'umożliwia udzial w konkursie',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'wez udzial w konkusie'
            });

          }
        }
      ]
    },
    't' : {
      'skills' : [
        {
          'name' : 'graj w pasjansa online',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+1 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'students' : 1
            });
          }
        },
        {
          'name' : 'koduj w microJava',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+2 kodu',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        },
        {
          'name' : 'tomaszewXP',
          'icon' : 'fa-star fa-3x',
          'enabled' : false,
          'info' : 'zainstaluj nowy system',
          'click' : function () {
            //todo
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'kup modem',
          'koszt' : 100,
          'info' : 'umożliwia gre w pasjansa online',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'graj w pasjansa online'
            });

          }
        },
        {
          'name' : 'napisz microJava',
          'icon' : 'fa-play fa-3x',
          'enabled' : true,
          'koszt' : 200,
          'info' : '+1 profit',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'koduj w microJava',
              'profit' : 5
            });
          }
        },
        {
          'name' : 'napisz inzynierke',
          'koszt' : 1000,
          'info' : 'odblokowuje upgrade do tomaszewXP',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'name' : 'tomaszewXP',
              'koszt' : 1000
            });

          }
        },
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

'use strict';

rocket.register.service('tomaszew95', function() {

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
      'name' : 'Cwiczenia',
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
          'name' : 'zle!',
          'icon' : 'fa-exclamation-triangle fa-3x',
          'enabled' : true,
          'info' : '+1 kod',
          'time' : -1,
          'click' : function () {
            rocket.service('engine').change({
              'money' : 1,
              'time' : 1
            });
          }
        },
        {
          'name' : 'sluchaj wykladu',
          'icon' : 'fa-graduation-cap fa-3x',
          'enabled' : true,
          'info' : '+2 kodu',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        },
        {
          'name' : 'nie sluchaj wykladu',
          'icon' : 'fa-graduation-cap fa-3x',
          'enabled' : false,
          'info' : '+1 student',
          'click' : function () {
            rocket.service('engine').change({
              'students' : 1
            });
          }
        },
        {
          'name' : 'asystuj profesorowi',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+1 profit',
          'click' : function () {
            console.log('elo');
            rocket.service('engine').change({
              'profit' : 1
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'kup sluchawki',
          'enabled' : true,
          'koszt' : 100,
          'opis' : 'na co komu wyklad?',
          'unlock' : 'nie sluchaj wykladu',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'nie sluchaj wykladu'
            });
          }
        },
        {
          'name' : 'namow profesora na wyklad',
          'enabled' : true,
          'koszt' : 100,
          'opis' : 'zacznij prowadzic wyklady',
          'unlock' : 'asystuj profesorowi',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'asystuj profesorowi'
            });
          }
        }
      ]
    },
    'c' : {
      'skills' : [
        {
          'name' : 'rob zadania',
          'icon' : 'fa-tasks fa-3x',
          'enabled' : true,
          'info' : '+2 kod',
          'click' : function () {
            rocket.service('engine').change({
              'kod' : 2
            });
          }
        },
        {
          'name' : 'pomoz kodzic znajomemu',
          'icon' : 'fa-medkit fa-3x',
          'enabled' : true,
          'info' : '-2 kod&+1 student',
          'click' : function () {
            rocket.service('engine').change({
              'money' : -2,
              'students' : 1
            });
          }
        },
        {
          'name' : 'wytknij blad prowadzacemu',
          'icon' : 'fa-comment fa-3x',
          'enabled' : true,
          'info' : '-10 kod&+2 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'money' : -10,
              'students' : 2
            });
          }
        },
      ],
      'upgrades' : []
    },
    'b' : {
      'skills' : [
        {
          'name' : 'czytaj dokumentacje',
          'icon' : 'fa-book fa-3x',
          'enabled' : true,
          'info' : '+1 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 1
            });
          }
        },
        {
          'name' : 'wez udzial w konkusie',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+1 profit&-5 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'profit' : 1,
              'students' : -5
            });
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'naucz sie kompilatora na pamiec',
          'koszt' : 100,
          'info' : 'umożliwia udzial w konkursie',
          'unlock' : 'wez udzial w konkusie',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'wez udzial w konkusie'
            });

          }
        }
      ]
    },
    't' : {
      'skills' : [
        {
          'name' : 'graj w pasjansa online',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+1 studentów',
          'click' : function () {
            rocket.service('engine').change({
              'students' : 1
            });
          }
        },
        {
          'name' : 'koduj w microJava',
          'icon' : 'fa-play fa-3x',
          'enabled' : false,
          'info' : '+2 kodu',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
            });
          }
        },
        {
          'name' : 'tomaszewXP',
          'icon' : 'fa-star fa-3x',
          'enabled' : false,
          'info' : 'zainstaluj nowy system',
          'click' : function () {
            rocket.service("engine").nextLvl();
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'kup modem',
          'koszt' : 100,
          'info' : 'umożliwia gre w pasjansa online',
          'unlock' : 'graj w pasjansa online',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'graj w pasjansa online'
            });

          }
        },
        {
          'name' : 'napisz microJava',
          'icon' : 'fa-play fa-3x',
          'enabled' : true,
          'koszt' : 200,
          'info' : '+1 profit',
          'unlock' : 'koduj w microJava',
          'click' : function (e) {
            rocket.service("engine").upgrade(e, {
              'koszt' : 100,
              'name' : 'koduj w microJava',
              'profit' : 5
            });
          }
        },
        {
          'name' : 'napisz inzynierke',
          'koszt' : 1000,
          'unlock' : 'tomaszewXP',
          'info' : 'odblokowuje upgrade do tomaszewXP',
          'click' : function (e) {

            rocket.service("engine").upgrade(e, {
              'name' : 'tomaszewXP',
              'koszt' : 1000
            });

          }
        },
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
              'money' : 2
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

rocket.register.module("left/default", function(element, params) {

  var $start = element.querySelector('div.start');
  var $menu  = element.querySelector('div.menu');
  var $timer = element.querySelector('div.timer');
  document.querySelector(':scope img').setAttribute('src', 'http://procek69.github.io/pjatk-the-burning-tomaszew/public/media/tomaszew.jpg');
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

      rocket.register.event('updateTime', function (time) {
        var s = time % 60,
            m = (time - s) / 60;

        $timer.innerHTML = [m, s < 10 ? '0' + s : s].join(':');
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

'use strict';

rocket.register.module('content/tile/upgrade', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible i').innerHTML = [params.koszt, 'kodu'].join(' ');
  element.querySelector('div.hidden p').innerHTML = params.info;

  return {
    constructor : function () {
      element.addEventListener('click', function (e) {
        params.click(e.target);
      }, true);
    }
  }
});

'use strict';

rocket.register.module('content/tile/skill', function (element, params) {

  element.querySelector('div.visible span').innerHTML = params.name;
  element.querySelector('div.visible p > i').className = ['fa', params.icon].join(' ');
  element.querySelector('div.hidden p').innerHTML = params.info;


  if (!params.enabled) {
    element.className += ' disabled';
  }

  return {
    constructor : function () {
      var click = params.click;
      rocket.register.event('updateSkills', function(upgrade) {
        if (params.name === upgrade.name) {
          element.className = 'skill';
        }
      });
      element.addEventListener('click', function(e) {
        if (element.className != 'skill disabled') {
          click();
        }
      }, true);
    }
  }

});
