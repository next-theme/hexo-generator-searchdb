/* global hexo */

'use strict';

const path = require('path');

const config = hexo.config.search = Object.assign({
  path   : 'search.xml',
  field  : 'post',
  content: true,
  format : 'html'
}, hexo.config.search);

// Add extension name if doesn't exist
if (!path.extname(config.path)) {
  config.path += '.xml';
}
if (path.extname(config.path) === '.xml') {
  hexo.extend.generator.register('xml', require('./lib/xml_generator'));
}
if (path.extname(config.path) === '.json') {
  hexo.extend.generator.register('json', require('./lib/json_generator'));
}
