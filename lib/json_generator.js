'use strict';

module.exports = function(locals) {
  var config = this.config;
  var database = require('./database')(locals, config);
  return {
    path: config.search.path,
    data: JSON.stringify(database)
  };
};
