const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    mode: 'production',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.min.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [{
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