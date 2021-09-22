const mix = require("laravel-mix");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("src/js/search.js", "static/js");

mix.postCss("src/css/main.css", "static/css", [
  require("postcss-import"),
  require("tailwindcss"),
  require("postcss-nested"),
  require("postcss-preset-env")({ stage: 0 }),
]);

if (mix.inProduction()) {
  mix.version();
}
