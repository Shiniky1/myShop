'use strict'

const path = require('path')
let fs = require('fs');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = {
    /* Path to source files directory */
    source: path.resolve(__dirname, './src/'),
    /* Path to built files directory */
    output: path.resolve(__dirname, './dist/'),
};
const favicon = path.resolve(paths.source, 'assets/images', 'favicon.ico');

module.exports = {
    stats: 'errors-only',
    // stats: {
    //     errorDetails: true,
    //     children: true
    // },

    mode: 'development',
    entry: {
        main: './src/index.js', // Intrarea pentru index.html
        about: './src/about.js',
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: paths.output,
        clean: true, // strege folderul dist inainte sa genereze altul
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            favicon: favicon,

            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['main'], // Include doar scripturile pentru main.bundle.js

        }),
        new HtmlWebpackPlugin({
            hash: true,
            favicon: favicon,
            template: './src/index.html', // Poți folosi același template
            filename: 'about.html',
            inject: 'body',
            chunks: ['about'], // Include doar scripturile pentru main.bundle.js
        }),
        new miniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(paths.source, 'assets/images'),
                    to: path.resolve(paths.output, 'assets/images'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                }
            ],
        }),
    ],
    module: {
        rules: [
            {
                mimetype: 'image/svg+xml',
                scheme: 'data',
                type: 'asset/resource',
                generator: {
                    filename: 'icons/[hash].svg'
                }
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
                type: 'asset/resource',
                generator: {
                    //filename: 'fonts/[name]-[hash][ext][query]'
                    filename: 'fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(scss)$/,

                use: [
                    {
                        // Extracts CSS for each JS file that includes CSS
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them

                        loader: 'css-loader',
                        options: {
                            sourceMap: false, // Dezactivează hărțile sursă pentru CSS
                        }
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            },

                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false, // Dezactivează hărțile sursă

                            sassOptions: {
                                outputStyle: "compressed",
                                charset: false,
                                quietDeps: true, // 🔹 Dezactivează warning-urile pentru dependințe

                            }
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                type: 'json'
            },
            {
                test: /\.(jpe?g|png|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: './images/[name].[hash:6][ext]',
                },
            },
            {
                test: /\.(js|ts)$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },

        ]
    },
    performance: { hints: false, maxAssetSize: 100000, }
}