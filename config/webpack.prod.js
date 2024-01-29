const path = require("path")
const ESLintPlugin = require("eslint-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMInimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

function getStyleloader(pre) {
    return [MiniCssExtractPlugin.loader, "css-loader", {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: ["postcss-preset-env"]
            }
        }
    }, pre].filter(Boolean)
}
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].[contenthash:10].js",
        chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
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
        new MiniCssExtractPlugin({
            filename:"static/css/[name].[contenthash:10].css",
            chunkFilename:"static/css/[name].[contenthash:10].chunk.css",
        }),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"../public"),
                    to:path.resolve(__dirname,"../dist"),
                    globOptions:{
                        ignore:["**/index.html"]
                    }
                }
            ]
        })
    ],
    mode: "production",
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        },
        minimizer:[new CssMInimizerWebpackPlugin(),new TerserWebpackPlugin(),new ImageMinimizerWebpackPlugin({
            minimizer:{
                implementation:ImageMinimizerWebpackPlugin.imageminGenerate,
                options:{
                    plugins:[
                        ["gifsicle",{interlaced:true}],
                        ["jpegtran",{progressive:true}],
                        ["optipng",{optimizationLevel:5}],
                        ["svgo",{plugins:[
                            "preset-default",
                            "prefixIds",
                            {
                                name:"sortAttrs",
                                params:{
                                    xmInsOrder:"alphabetical"
                                }
                            }
                        ]}],
                    ]
                }
            }
        })]
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"]
    },
}