(function() {
  'use strict';
  var e, module;

  module = null;

  try {
    module = angular.module('ndx');
  } catch (error) {
    e = error;
    module = angular.module('ndx', []);
  }

  module.factory('LocalSettings', function(Auth, $rootElement) {
    var appName, get, getGlobalSettings, getUserSettings, set, setGlobalSettings, setUserSettings;
    appName = $rootElement.attr('ng-app');
    getUserSettings = function() {
      var output, user;
      output = {};
      if (localStorage && (user = Auth.getUser())) {
        try {
          output = JSON.parse(localStorage.getItem(appName + '_' + user._id)) || {};
        } catch (error) {}
      }
      return output;
    };
    setUserSettings = function(value) {
      var user;
      if (localStorage && (user = Auth.getUser())) {
        localStorage.setItem(appName + '_' + user._id, JSON.stringify(value));
      }
    };
    getGlobalSettings = function() {
      var output;
      output = {};
      if (localStorage) {
        try {
          output = JSON.parse(localStorage.getItem(appName)) || {};
        } catch (error) {}
      }
      return output;
    };
    setGlobalSettings = function(value) {
      if (localStorage) {
        localStorage.setItem(appName, JSON.stringify(value));
      }
    };
    get = function(settings, key) {
      var bit, bits, j, len, output;
      bits = key.split(/\./g);
      output = settings;
      for (j = 0, len = bits.length; j < len; j++) {
        bit = bits[j];
        output = output[bit] || {};
      }
      if (JSON.stringify(output) === '{}') {
        return null;
      } else {
        return output;
      }
    };
    set = function(settings, key, value) {
      var bit, bits, i, j, len, output, results;
      bits = key.split(/\./g);
      output = settings;
      results = [];
      for (i = j = 0, len = bits.length; j < len; i = ++j) {
        bit = bits[i];
        if (!output[bit]) {
          output[bit] = {};
        }
        if (i < bits.length - 1) {
          results.push(output = output[bit]);
        } else {
          results.push(output[bit] = value);
        }
      }
      return results;
    };
    return {
      get: function(key) {
        var settings;
        settings = getUserSettings();
        return get(settings, key);
      },
      set: function(key, value) {
        var settings;
        settings = getUserSettings();
        set(settings, key, value);
        return setUserSettings(settings);
      },
      getGlobal: function(key) {
        var settings;
        settings = getGlobalSettings();
        return get(settings, key);
      },
      setGlobal: function(key, value) {
        var settings;
        settings = getGlobalSettings();
        set(settings, key, value);
        return setGlobalSettings(settings);
      }
    };
  });

}).call(this);

//# sourceMappingURL=index.js.map
