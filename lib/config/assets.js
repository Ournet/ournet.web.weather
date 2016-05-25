'use strict';

exports.css = {};
exports.js = {};

exports.css.main = process.env.ASSETS_CSS_MAIN || '54f99504a1';
exports.css.mainMobile = process.env.ASSETS_CSS_MAIN_MOBILE || '69fb4f857b';
exports.css.pageWidget = process.env.ASSETS_CSS_PAGE_WIDGET || 'a784362368';

exports.js.main = process.env.ASSETS_JS_MAIN || '3b14e34193';
exports.js.mainMobile = process.env.ASSETS_JS_MAIN_MOBILE || '3b14e34193';
exports.js.pageWidget = process.env.ASSETS_JS_PAGE_WIDGET || '9995504c07';
