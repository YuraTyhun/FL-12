const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src + '/js/index.js'
    },
    output: {
        path: PATHS.dist,
        filename: 'js/[name].js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: false, 
            template: `${PATHS.src}/index.html`,
            filename: './index.html' 
        }),
        new CopyWebpackPlugin([{
            from: `${PATHS.src}/img`,
            to: 'img'
        }]),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new PrettierPlugin({
            "singleQuote": true
        })
    ]
}