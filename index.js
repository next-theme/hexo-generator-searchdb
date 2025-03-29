/* global hexo */

'use strict';

const path = require('path');

hexo.config.search = Object.assign({
  path   : 'search.json',
  field  : 'post',
  content: true,
  format : 'striptags'
}, hexo.config.search);
const config = hexo.config.search;

// Add extension name if doesn't exist
if (!path.extname(config.path)) {
  config.path += '.json';
}
if (path.extname(config.path) === '.xml') {
  hexo.extend.generator.register('xml', require('./lib/xml_generator'));
} else if (path.extname(config.path) === '.json') {
  hexo.extend.generator.register('json', require('./lib/json_generator'));
}
