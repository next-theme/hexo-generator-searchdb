'use strict';

const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
let env = new nunjucks.Environment();

let searchTmplSrc = path.join(__dirname, '../templates/search.xml');
let searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, 'utf8'), env);

module.exports = function(locals) {
  let config = this.config;
  let database = require('./database')(locals, config);
  let xml = searchTmpl.render({
    articles: database,
    config  : config.search
  });
  return {
    path: config.search.path,
    data: xml
  };
};
