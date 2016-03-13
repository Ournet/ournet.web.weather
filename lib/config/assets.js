'use strict';

exports.css = {};
exports.js = {};

exports.css.main = process.env.ASSETS_CSS_MAIN || '7f33bd996e';
exports.css.mainMobile = process.env.ASSETS_CSS_MAIN_MOBILE || '4ca2728b51';
exports.css.pageWidget = process.env.ASSETS_CSS_PAGE_WIDGET || 'a784362368';

exports.js.main = process.env.ASSETS_JS_MAIN || '82b2c68692';
exports.js.mainMobile = process.env.ASSETS_JS_MAIN_MOBILE || '82b2c68692';
exports.js.pageWidget = process.env.ASSETS_JS_PAGE_WIDGET || '9995504c07';
