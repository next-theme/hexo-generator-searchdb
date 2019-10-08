'use strict';

const { stripHTML } = require('hexo-util');

function savedb(article, config, isPost) {
  var data = {};
  if (article.title) {
    data.title = article.title;
  }
  if (article.path) {
    data.url = encodeURI(config.root + article.path);
  }
  if (config.search.content !== false) {
    if (config.search.format === 'raw') {
      data.content = article._content;
    } else {
      data.content = article.content.replace(/<td class="gutter">.*?<\/td>/g, '');
      if (config.search.format === 'striptags') {
        data.content = stripHTML(data.content);
      }
    }
  } else {
    data.content = '';
  }
  if (!isPost) {
    return data;
  }
  if (article.categories && article.categories.length > 0) {
    var categories = [];
    article.categories.forEach(category => {
      categories.push(category.name);
    });
    data.categories = categories;
  }
  if (article.tags && article.tags.length > 0) {
    var tags = [];
    article.tags.forEach(tag => {
      tags.push(tag.name);
    });
    data.tags = tags;
  }
  return data;
}

module.exports = function(locals, config) {
  var searchfield = config.search.field;
  var database = [];
  if (searchfield === 'all' || searchfield === 'post') {
    locals.posts.sort(config.index_generator.order_by).each(post => {
      var data = savedb(post, config, true);
      database.push(data);
    });
  }
  if (searchfield === 'all' || searchfield === 'page') {
    locals.pages.each(page => {
      var data = savedb(page, config);
      database.push(data);
    });
  }
  return database;
}
