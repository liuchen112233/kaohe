const path = require("path")
const ESLintPlugin = require("eslint-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

function getStyleloader(pre){
    return ["style-loader", "css-loader", {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: ["postcss-preset-env"]
            }
        }
    },pre].filter(Boolean)
}
module.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleloader()
            },
            {
                test: /\.less$/,
                use: getStyleloader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleloader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleloader("stylus-loader")
            },
            {
                test:/\.(png|jpe?g|gif|webp|svg)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        maxSize:10*1024
                    }
                }
            },
            {
                test:/\.(ttf|woff2?)$/,
                type:"asset/resource",
            },
            {
                test:/\.jsx?$/,
                include:path.resolve(__dirname,"../src"),
                loader:"babel-loader",
                options:{
                    cacheDirectory:true,
                    cacheCompression:false,
                    plugins:["react-refresh/babel"]                
                },
            }
        ]
    },  
    plugins:[
        new ESLintPlugin({
            context:path.resolve(__dirname,"../src"),
            exclude:"node_modules",
            cache:true,
            cacheLocation:path.resolve(__dirname,"../node_modules/.cache/.eslintcache")
        }),
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,"../public/index.html")
        }),
        new ReactRefreshWebpackPlugin()
    ],
    mode:"development",
    devtool:"cheap-module-source-map",
    optimization:{
        splitChunks:{
            chunks:"all"
        },
        runtimeChunk:{
            name:entrypoint=>`runtime~${entrypoint.name}.js`
        }
    },
    resolve:{
        extensions:[".jsx",".js",".json"]
    },
    devServer:{
        host:"localhost",
        port:3001,
        open:true,
        hot:true,
        historyApiFallback:true
    }
}