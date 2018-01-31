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

  module.factory('LocalSettings', function(Auth) {
    var getUserSettings, setUserSettings;
    getUserSettings = function() {
      var output, user;
      output = {};
      if (localStorage && (user = Auth.getUser())) {
        try {
          output = JSON.parse(localStorage.getItem(user._id)) || {};
        } catch (error) {}
      }
      return output;
    };
    setUserSettings = function(value) {
      var user;
      if (localStorage && (user = Auth.getUser())) {
        localStorage.setItem(user._id, JSON.stringify(value));
      }
    };
    return {
      get: function(key) {
        var bit, bits, j, len, output, settings;
        settings = getUserSettings();
        bits = key.split(/\./g);
        output = settings;
        for (j = 0, len = bits.length; j < len; j++) {
          bit = bits[j];
          output = output[bit] || {};
        }
        return output;
      },
      set: function(key, value) {
        var bit, bits, i, j, len, output, settings;
        settings = getUserSettings();
        bits = key.split(/\./g);
        output = settings;
        for (i = j = 0, len = bits.length; j < len; i = ++j) {
          bit = bits[i];
          if (!output[bit]) {
            output[bit] = {};
          }
          if (i < bits.length - 1) {
            output = output[bit];
          } else {
            output[bit] = value;
          }
        }
        return setUserSettings(settings);
      }
    };
  });

}).call(this);

//# sourceMappingURL=index.js.map
