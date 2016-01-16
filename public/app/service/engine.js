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

  function updateValues() {
    rocket.trigger('updateMoney', money);
    rocket.trigger('updateStudents', students);
    rocket.trigger('updateProfit', profit);
  }

  function updateSkills(params) {
    rocket.trigger('updateSkills', params);
  }

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

  var lvl = 'win95';

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
    loadLvl : function (name) {
      lvl = name;
      rocket.trigger('updateLvl', {
        'lvl' : name
      });
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
    getSkills : function (letter) {
      return rocket.service(lvl).getSkills(letter);
    },
    getUpgrades : function (letter) {
      return rocket.service(lvl).getUpgrades(letter);
    },
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
