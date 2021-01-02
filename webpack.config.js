const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.min.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true
                    }
                }]
            }
        ]
    }
};