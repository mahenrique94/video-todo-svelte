const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PUBLIC_DIR = 'public'

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, PUBLIC_DIR),
        hot: true,
        port: 3340
    },
    entry: path.resolve(__dirname, 'src', 'main.js'),
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, PUBLIC_DIR, 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.svelte', '.js'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    target: 'web'
}
