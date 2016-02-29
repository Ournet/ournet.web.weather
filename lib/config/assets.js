'use strict';

exports.css = {};
exports.js = {};

exports.css.main = process.env.ASSETS_CSS_MAIN || 'b667352567';
exports.css.mainMobile = process.env.ASSETS_CSS_MAIN_MOBILE || '523ff4afb7';
exports.css.pageWidget = process.env.ASSETS_CSS_PAGE_WIDGET || 'a784362368';

exports.js.main = process.env.ASSETS_JS_MAIN || '82b2c68692';
exports.js.mainMobile = process.env.ASSETS_JS_MAIN_MOBILE || '82b2c68692';
exports.js.pageWidget = process.env.ASSETS_JS_PAGE_WIDGET || '9995504c07';
