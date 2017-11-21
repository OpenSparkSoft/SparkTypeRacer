/**
 * Created by Grimbode on 21/11/2017.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "spark_type_racer":     path.join(__dirname, 'src', 'main.ts'),
        "spark_type_racer.min": path.join(__dirname, 'src', 'main.ts'),
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, '../public/js/dist'),
        filename: "[name].js",
        library: 'SparkTypeRacer',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};