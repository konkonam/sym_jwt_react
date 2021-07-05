const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // Build
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSingleRuntimeChunk()

    // SCSS
    .addStyleEntry('css/app', './assets/scss/app.scss')
    .enableSassLoader()

    // Typescript + React
    .addEntry('app', './assets/ts/app.tsx')
    .enableTypeScriptLoader()
    .enableReactPreset()
;

module.exports = Encore.getWebpackConfig();
