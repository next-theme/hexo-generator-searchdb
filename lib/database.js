'use strict';

const { stripHTML } = require('hexo-util');

function savedb(article, config, isPost) {
  let data = {};
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
    let categories = [];
    article.categories.forEach(category => {
      categories.push(category.name);
    });
    data.categories = categories;
  }
  if (article.tags && article.tags.length > 0) {
    let tags = [];
    article.tags.forEach(tag => {
      tags.push(tag.name);
    });
    data.tags = tags;
  }
  return data;
}

module.exports = function(locals, config) {
  let searchfield = config.search.field;
  let database = [];
  if (searchfield === 'all' || searchfield === 'post') {
    locals.posts.each(post => {
      let data = savedb(post, config, true);
      database.push(data);
    });
  }
  if (searchfield === 'all' || searchfield === 'page') {
    locals.pages.each(page => {
      let data = savedb(page, config);
      database.push(data);
    });
  }
  return database;
}
