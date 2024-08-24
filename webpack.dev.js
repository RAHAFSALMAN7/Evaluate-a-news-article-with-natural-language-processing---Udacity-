const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.scss$/, // قاعدة التحميل لملفات SCSS
                use: [
                    'style-loader', // يقوم بإدراج CSS في DOM عبر عنصر <style>
                    'css-loader',   // يقوم بتحويل ملفات CSS إلى وحدات نمطية JavaScript
                    'sass-loader'   // يقوم بتحويل SCSS إلى CSS
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW() // إضافة هذا إذا كنت تستخدم Workbox للتعامل مع الخدمة
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all',
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
