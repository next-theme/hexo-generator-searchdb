# hexo-generator-searchdb

[![Build Status][github-image]][github-url]
[![npm-image]][npm-url]
[![hexo-image]][hexo-url]
[![lic-image]](LICENSE)

Seach data generator plugin for Hexo.

This plugin is used for generating a search index file, which contains all the necessary data of your articles that you can use to write a local search engine for your blog. Supports both JSON and XML format output. The JSON format is recommended, as it has a smaller size and avoids encoding issues.

## Install

![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

```bash
npm install hexo-generator-searchdb
```

## Options

You can configure this plugin in your root `_config.yml`. All the arguments are optional.

``` yaml
search:
  path: search.json
  field: post
  content: true
  format: html
```

- **path** - the path to the generated database file. Supports `.json` and `.xml` formats. If no file extension is provided, JSON format will be used by default.
- **field** - the search scope you want to search, you can chose:
  * **post** (Default) - will only cover all the posts of your blog.
  * **page** - will only cover all the pages of your blog.
  * **all** - will cover all the posts and pages of your blog.
- **content** - whether contains the whole content of each article. If `false`, the generated results only cover title and other meta info without mainbody. By default is `true`.
- **format** - the form of the page contents, options are:
  * **html** (Default) - original html string being minified.
  * **striptags** - original html string being minified, and remove all the tags.
  * **raw** - markdown text of each posts or pages.

## FAQ

### What's this plugin supposed to do?

This plugin is used for generating a JSON / XML file from your Hexo blog that provides data for searching.

### Where's this file saved to?

After executing `hexo g` you will get the generated result at your public folder.

### How to use this plugin in my Hexo blog?

You have two choices:

* you don't want to write search engine by yourself. There are many themes that take use this plugin for local searching that works out of box.
* you are familiar with JavaScript and would like to write your own search engine. You can implement one by yourself according to the [template code `search.js`](https://github.com/next-theme/hexo-generator-searchdb/blob/main/dist/search.js). There is no documentation at present, but you can find its usage in the source code of the [theme NexT](https://github.com/next-theme/hexo-theme-next). Generally there are 3 steps:
  1. write a [search view](https://github.com/next-theme/hexo-theme-next/blob/v8.8.0/layout/_partials/search/localsearch.njk). This is the place for displaying a search form and search results;
  2. load the `search.js` script via CDN, for example:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/hexo-generator-searchdb@1.4.0/dist/search.js"></script>
  ```
  A `LocalSearch` class is provided in the `search.js` which tells the browser how to grab search data and filter out contents what we're searching;

  3. write a [search script](https://github.com/next-theme/hexo-theme-next/blob/v8.8.0/source/js/third-party/search/local-search.js), make use of the previous `LocalSearch` class.

[github-image]: https://img.shields.io/github/actions/workflow/status/next-theme/hexo-generator-searchdb/linter.yml?branch=main&style=flat-square
[npm-image]: https://img.shields.io/npm/v/hexo-generator-searchdb?style=flat-square
[hexo-image]: https://img.shields.io/badge/hexo-%3E%3D%203.0-blue?style=flat-square
[lic-image]: https://img.shields.io/npm/l/hexo-generator-searchdb?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/next-theme/hexo-generator-searchdb?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/hexo-generator-searchdb?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/hexo-generator-searchdb?style=flat-square

[github-url]: https://github.com/next-theme/hexo-generator-searchdb/actions?query=workflow%3ALinter
[npm-url]: https://www.npmjs.com/package/hexo-generator-searchdb
[hexo-url]: https://hexo.io
