#!/bin/env node

var consts = require ('./include/constants');
var opts = require ('./include/load_opts');

console.log("addStyles : "  + opts.styles);
console.log("addMetas : "  + opts.metas);
console.log("tabSize : "  + opts.tabsize);
console.log("version : "  + opts.htmlvers);
