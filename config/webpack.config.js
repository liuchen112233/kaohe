const path = require("path")
const ESLintPlugin = require("eslint-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMInimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const isProduction = process.env.NODE_ENV == "production"
function getStyleloader(pre) {
    return [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: ["postcss-preset-env"]
            }
        }
    }, pre&&{
        loader:pre,
        options:pre == "less-loader"?
        {
            lessOptions:{
                modifyVars:{"@primary-color":"#1da57a"},
                javascriptEnabled:true
            }
        }:{}
    }].filter(Boolean)
}
module.exports = {
    entry: "./src/main.js",
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true
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
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins:[!isProduction &&"react-refresh/babel"].filter(Boolean)
                },
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache")
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
        }),
        isProduction && new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"]
                    }
                }
            ]
        }),
        !isProduction && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    mode:isProduction? "production":"development",
    devtool:isProduction?  "source-map":"cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups:{
                react:{
                    test:/[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name:"chunk-react",
                    priority:40,
                },
                antd:{
                    test:/[\\/]node_modules[\\/]antd[\\/]/,
                    name:"chunk-antd",
                    priority:30,
                },
                libs:{
                    test:/[\\/]node_modules[\\/]/,
                    name:"chunk-libs",
                    priority:20,
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        }, 
        minimize:isProduction,
        minimizer: [new CssMInimizerWebpackPlugin(), new TerserWebpackPlugin(), new ImageMinimizerWebpackPlugin({
            minimizer: {
                implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        ["svgo", {
                            plugins: [
                                "preset-default",
                                "prefixIds",
                                {
                                    name: "sortAttrs",
                                    params: {
                                        xmInsOrder: "alphabetical"
                                    }
                                }
                            ]
                        }],
                    ]
                }
            }
        })]
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"]
    },
    devServer:{
        host:"localhost",
        port:3001,
        open:true,
        hot:true,
        historyApiFallback:true
    },
    performance:false,
}