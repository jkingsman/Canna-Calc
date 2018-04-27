const webpack = require('webpack');
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
        }, ]
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
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    }
};
