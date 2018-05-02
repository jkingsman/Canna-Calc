const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
        }, ]
    },
    plugins: [
        new ManifestPlugin(),
        new CopyWebpackPlugin([{
            from: 'src/favicon',
            to: 'favicon'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/static',
            to: 'static'
        }]),
        new OfflinePlugin({
            externals: [
                '/',
                '/index.html'
            ]
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'app': path.resolve('src')
        }
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    }
};
