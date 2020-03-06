const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new ImageminWebpackPlugin({
            test: /\.(png|jpg|gif|svg)$/i 
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
})
