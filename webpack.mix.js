let mix 			= 	require('webpack-mix').mix;
let minifier 		= 	require('minifier');
var pathNode 		= 	'node_modules/'
	,pathResource 	= 	'resource/'
	,pathAsset		=	'asset/';

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js(pathResource+'js/main.js', 'asset/js/')
	.combine([
				// pathNode+'bootstrap/dist/js/bootstrap.js', 
				pathNode+'jquery/dist/jquery.js',
				pathNode+'uikit/dist/js/uikit.js',
				pathNode+'uikit/dist/js/uikit-icons.js'
	        ], pathAsset+'js/libs.js')
	.sass(pathResource+'sass/tisco-core.scss', pathAsset+'css/', {
	    outputStyle: mix.inProduction ? 'compressed' : 'expanded'
	 })	
	.sass(pathResource+'sass/tisco-theme.scss', pathAsset+'css', {
	    outputStyle: mix.inProduction ? 'compressed' : 'expanded'
	 })
	.copyDirectory([pathResource+'fonts'], pathAsset+'fonts/')
	.copyDirectory([pathNode+'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'], pathAsset+'js/')
	.copyDirectory([pathNode+'bootstrap-datepicker/dist/locales/bootstrap-datepicker-en-CA.min.js'], pathAsset+'js/localization/bootstrap-datepicker-en.min.js')
	.copyDirectory([pathNode+'bootstrap-datepicker/dist/locales/bootstrap-datepicker.th.min.js'], pathAsset+'js/localization')
	.copyDirectory([pathNode+'jquery-validation/dist/jquery.validate.min.js'], pathAsset+'js/')
	.copyDirectory([pathNode+'jquery-validation/dist/localization/messages_th.min.js'], pathAsset+'js/localization');

if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: 'source-map'
    })
    .sourceMaps()
}else{
    mix.minify([pathAsset+'js/lib.js', pathAsset+'js/main.js']).version();
}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });