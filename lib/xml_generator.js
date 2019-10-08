'use strict';

const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
var env = new nunjucks.Environment();

var searchTmplSrc = path.join(__dirname, '../templates/search.xml');
var searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, 'utf8'), env);

module.exports = function(locals) {
  var config = this.config;
  var database = require('./database')(locals, config);
  var xml = searchTmpl.render({
    articles: database,
    config  : config.search
  });
  return {
    path: config.search.path,
    data: xml
  };
};
