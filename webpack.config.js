const webpack = require('webpack');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = {
    svelte: path.resolve('node_modules', 'svelte')
};

const extensions = ['.msj', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
    client: {
        entry: config.client.entry(),
        output: config.output(),
        resolve: {
            alias,
            extensions,
            mainFields
        },
        module: {
            rules: [{
                test: /\.(svelte|html)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        dev,
                        hydratable: true,
                        hotReload: false
                    }
                }
            }]
        },
        mode,
        plugins: [
            new webpack.DefinePlugin({
                'process.browser': true,
                'process.env.NODE_EN': JSON.stringify(mode)
            }),
        ].filter(Boolean),
        devtool: dev && 'inline-source-map'
    },
    server: {
        entry: config.server.entry(),
        output: config.server.output(),
        target: {
            alias,
            extensions,
            mainFields
        },
        externals: Object.keys(pkg.dependencies).concat('encoding'),
        module: {
            rules: [{
                test: /\.(svelte|html)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        dev,
                        css: false,
                        generate: 'ssr'
                    }
                }
            }]
        },
        mode: process.env.NODE_ENV,
        performance: {
            hints: false
        }
    },
};