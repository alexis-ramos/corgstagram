const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
    },
    resolve: {
        extensions: ['*', '.mjs', '.js', '.svelte'],
    },
    module: {
        rules: [{
                test: /\.js?$/,
                exclude: [/node_modules/, require.resolve('./public/index.html')],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html',
        }),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        inline: true
    },
};