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
  });

  return {
    constructor: function () {
      load();
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
  var time = 60*90; //90 minut

  function updateValues() {
    rocket.trigger('updateMoney', money);
    rocket.trigger('updateStudents', students);
    rocket.trigger('updateProfit', profit);
  }

  function updateSkills(params) {
    rocket.trigger('updateSkills', params);
  }

  function tryUpgrade($parent) {

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
/*
  var data = {
    'a' : {
      'skills' : [
        {
          'name' : 'Ucz kodu',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          'info' : '-10 kodu<br />+2 studentów',
          click : function () {

            if(money < 10) return;

            money -= 10;
            students += 2;

            updateValues();
          }
        },
        {
          'name' : 'Prowadź wykład',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          'info' : '-100 kodu<br />+25 studentów',
          click : function () {

            if (money < 100) return;

            money -= 100;
            students += 25;

            updateValues();
          }

        },
        {
          'name' : 'Streamuj WoW\'a',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          'info' : '+25 studentów',
          'click' : function () {
            students += 10;
            updateValues();
          }
        },
        {
          'name' : 'Wstaw wykłady',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          'info' : '+100 studentów',
          'click' : function () {
            students += 100;
            updateValues();
          }
        },
        {
          'name' : 'Zrób studentów w balona',
          'icon' : 'fa fa-edge fa-2x',
          'enabled' : true,
          'info' : '-100 studentów<br />+1 profit',
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
          'info' : '-100 studentów<br />+500 kodu',
          'click' : function () {
            if (students < 100) return;

            students -= 100;
            money += 500;

            updateValues();
          }
        },
        {
          'name' : 'Zrób egzamin',
          'icon' : 'fa fa-calendar-o fa-2x',
          'enabled' : false,
          'info' : '-200 studentów<br />+5 profit',
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
          'info' : 'Odlobokuje kolokwium<br />-100 kodu',
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
          'info' : 'Odblokuje egzamin<br />-100 kodu',
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
          'opis' : 'Kolokwium i egzamin dają 20 więcej kodu',
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
          'opis' : 'Kolokwium i egzamin dają 20 więcej kodu',
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
          'opis' : 'Kolokwium i egzamin dają 20 więcej kodu',
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
          'opis' : '-1 student<br />+', //todo
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
          'opis' : '-1 student<br/>+', //todo
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
          'opis' : '+1 student',
          'click' : function (e) {

            students++;

            updateValues();
          }
        },
        {
          'name' : 'Daj wymagające zadania',
          'icon' : 'fa fa-cubes fa-2x',
          'enabled' : true,
          'opis' : '+kodu<br />-10 studentów',
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
          'opis' : '+400 kodu<br />+25 studentów',
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
          'opis' : '-1 student<br />+', //todo
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
          'name' : 'Stwórz galerię na sharepoint',
          'koszt' : 1000,
          'opis' : '-1000 kodu<br />+100 studentów',
          'click' : function (e) {
            upgrade(e, {
              'koszt' : 1000,
              'student' : 100
            });
          }
        },
        //todo: you are doint it wrong
        {
          'name' : 'zabezpiecz sharepoint',
          'koszt' : 0,
          'opis' : 'hacker needed',
          'click' : function (e) {
            if (prompt('01110100 01100001 01101011') == 'tak') {
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
          'icon' : 'fa fa-users fa-2x',
          'koszt' : 10000,
          'opis' : 'profit +20<br />-10000 kodu',
          'click' : function (e) {
            upgrade(e, {
              'koszt' : 10000,
              'profit' : 20
            });
          }
        },
        {
          'name' : 'Nakłoń Procka do kodu',
          'icon' : 'fa fa-terminal fa-2x',
          'koszt' : 1000,
          'enabled' : false,
          'opis' : '-1000 kodu<br />+69 profit',
          'click' : function (e) {
            upgrade(e, {
              'koszt' : 1000,
              'profit' : 69
            });
          }
        },
        {
          'name' : 'Masteruj skille adeptów',
          'icon' : 'fa fa-spinner fa-2x',
          'opis' : '-1000 kodu<br />+1 profit',
          'click' : function (e) {
            upgrade(e,{
              'koszt' : 1000,
              'profit' : 1
            })
          }
        }
      ],
      'upgrades' : [
        {
          'name' : 'Zrekrutuj Procka',
          'koszt' : 69000,
          'opis' : '-69000 kodu<br />+6900 profit<br />odblokowuje "Nakłoń Procka do kodu"',
          'click' : function (e) {

            upgrade(e, {
              'koszt' : 69000,
              'profit' : 6900,
              'name' : 'Nakłoń Procka do kodu',
              'callback' : function () {
                skillsPower['procek69'] = true;
              }
            });
          }
        },
        {
          'name' : 'Nowy sprzęt',
          'koszt' : 10000,
          'opis' : '+200 profit<br />-10000 kody',
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
          'opis' : '+200 kodu / s<br />-10000kodu',
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
*/
  function renderSkill (element, params) {

    var div = document.createElement('div');
    div.className = 'skill';

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
      time--;
      updateValues();
    },
    loadLvl : function () {
      /*rocket.trigger('updateLvl', {
        'lvl' : name
      });*/
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
      //rocket.trigger('loadLvl', function () {});
      rocket.trigger('reloadMenu', this.getMenu());
      this.loadLvl(lvl);
    },
    getSkills : function (letter) {
      return rocket.service(lvl).getSkills(letter);
    },
    getUpgrades : function (letter) {
      return rocket.service(lvl).getUpgrades(letter);
    },
    change : function (params) {

      if (params['money'])
        money += params['money'];

      var m = params['money'] || 0;
      var s = params['students'] || 0;
      var p = params['profit'] || 0;

      //przypadek braku hajsu lub studentów
      if ((m < 0 && money >= m) || (s < 0 && students >= s)) {
        students += s;
        m += s;
        profit += p;
        updateValues();
        return;
      }

      profit += p;
      students += s;
      m += s;
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

rocket.register.service('tomaszew95', function() {

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
          'name' : 'źle!',
          'icon' : 'fa-exclamation-triangle fa-3x',
          'enabled' : true,
          'info' : '+1 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
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
    setUp : function () {
      console.log('elo');
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
      'name' : 'Nie Aula',
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
          'name' : 'źle!',
          'icon' : 'fa-exclamation-triangle fa-3x',
          'enabled' : true,
          'info' : '+1 kod',
          'click' : function () {
            rocket.service('engine').change({
              'money' : 2
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
      rocket.register.event('updateLvl', function (params) {
        console.log(params);
      });
      element.addEventListener('click', function(e) {
        if (element.className != 'skill disabled') {
          click();
        }
      }, true);
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
