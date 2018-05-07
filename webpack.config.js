const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin(),
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
        }])
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    }
};