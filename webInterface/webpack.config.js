const webpack = require("webpack");
const path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, "src", "client.js"),
    output: {
        path: path.join(__dirname, "src", "static"),
        filename: "scripts/bundle.js"
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, "src"),
                exclude: "/node_modules/",
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"]
                }
            },
            {
                test: /\.scss$/,
                exclude: "/node_modules/",
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!resolve-url-loader!sass-loader?sourceMap"
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.DefinePlugin({
            "process.env.SERVICE_URL": JSON.stringify(process.env.SERVICE_URL)
        }),
        new webpack.DefinePlugin({
            "process.env.BUILD_TARGET": JSON.stringify(process.env.BUILD_TARGET)
        }),
        new ExtractTextPlugin({
            filename: "styles/style.css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
};
