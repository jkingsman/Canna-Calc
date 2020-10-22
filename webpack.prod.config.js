const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        new ManifestPlugin({
            seed: {'start_url': '/index.html'}
        }),
        new CopyWebpackPlugin([{
            from: 'src/favicon',
            to: 'favicon'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/static',
            to: 'static'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/index.html',
            to: 'index.html'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/robots.txt',
            to: 'robots.txt'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/sitemap.xml',
            to: 'sitemap.xml'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/_redirects',
            to: 'redirects'
        }]),
        new UglifyJsPlugin(),
        new OfflinePlugin({
            responseStrategy: 'network-first',
            autoUpdate: true,
            minify: true,
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
