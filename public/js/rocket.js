'use strict';

var rocket = (function () {

  (function(doc, proto) {
    try {
      doc.querySelector(':scope body');
    } catch (err) {
      ['querySelector', 'querySelectorAll'].forEach(function(method) {
        var nativ = proto[method];
        proto[method] = function(selectors) {
          if (/(^|,)\s*:scope/.test(selectors)) {
            var id = this.id;
            this.id = 'ID_' + Date.now();
            selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id);
            var result = doc[method](selectors);
            this.id = id;
            return result;
          } else {
            return nativ.call(this, selectors);
          }
        }
      });
    }
  })(window.document, Element.prototype);

  document.addEventListener('DOMContentLoaded', function (e) {
    rocket.launch(document);
  });

  var modules = [],
      services = [],
      events = [];

  var priv = {
    ajax : function(method, url) {
      return new Promise(function( resolve, reject ) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.onload = function() {
          if ( req.status !== 200 ) {
            return reject(new Error(req.statusText));
          }
          return resolve(req.responseText);
        };
        req.onerror = function() {
          reject(new Error('Network Error'));
        };
        req.send();
      });
    }
  };

  return {
    register : {
        module : function (name, funct) {
          modules[name] = funct;
        },
        service : function (name, funct) {
          services[name] = funct();
        },
        event : function (name, callback) {
          if (events[name] === undefined)
            events[name] = [];
          events[name].push(callback);
        }
    },
    http : {
      post   : function (url) {return priv.ajax('POST', url)},
      get    : function (url) {return priv.ajax('GET', url)},
      put    : function (url) {return priv.ajax('PUT', url)},
      delete : function (url) {return priv.ajax('DELETE', url)},
      send   : function (method, url) {return priv.ajax(method, url)}
    },
    service : function(name) {
      return services[name];
    },
    execute : function(name, element, params) {
      modules[name](element, params).constructor();
    },
    trigger : function(name, params) {
      for (var i = 0, l = events[name].length || 0; i < l; i++) {
        events[name][i](params);
      }
    },
    launch : function(element) {
      var includes = element.querySelectorAll('[data-rocket-module]');

      for (var i = 0, len = includes.length; i < len; i++) {
        rocket.router.route(includes[i]);
      }
    },
    router : {
      route : function(element) {
          var attr = element.getAttribute('data-rocket-module');
          rocket.http.get(['app', attr, 'index.html'].join('/'))
            .then(function(data) {
              element.innerHTML = data;
              rocket.execute(attr, element);
          }).catch(function (err) {
              console.error(err);
              console.error(err.stack);
          });
      },
      routeModuleHere : function(element) {
        var attr = element.getAttribute('data-rocket-include');
        rocket.http.get(['app', attr, 'index.html'].join('/'))
          .then(function(data) {
            element.innerHTML = data;
            rocket.execute(attr, element);
            rocket.launch(element);
        }).catch(function (err) {
            console.log(err);
        });
      },
      loadModuleIntoElement : function(name, element, params) {
          rocket.http.get(['app', name, 'index.html'].join('/'))
            .then(function(data) {
              element.innerHTML = data;
              rocket.execute(name, element, params);
              rocket.launch(element);
          }).catch(function (err) {
              console.log(err);
          });
      }
    }
  };

})();
