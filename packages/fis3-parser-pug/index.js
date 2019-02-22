"use strict";

var _pug = require("pug");

module.exports = function (content, file, conf) {
  return content ? (0, _pug.render)(content, conf) : '';
};

module.exports.defaultOptions = {
  "pretty": "  ",
  "doctype": "html"
};