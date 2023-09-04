const path = require('path');
const babelrc = require('./src/.babelrc');

const jsRules = {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components|vendors)\/(?!(are-you-es5|eslint-plugin-cypress|fs-extra|nunito-fontface|query-string|split-on-first)\/).*/,
    use: [
        {
            loader: 'babel-loader',
            options: babelrc,
        },
    ],
};

const modules = {
    rules: [
        jsRules
    ],
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'custom-vanilla.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    module: modules,
};
