'use strict';

module.exports = function(locals) {
  let config = this.config;
  let database = require('./database')(locals, config);
  return {
    path: config.search.path,
    data: JSON.stringify(database)
  };
};
