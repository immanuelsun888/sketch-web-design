const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const pug = require('pug');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

var isProd = process.env.NODE_ENV === 'production'; // true or false

var cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    }, {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: () => [require('autoprefixer')]
        }
    }, {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }],
});
var cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: {
        index: [
            './src/index.js',
            './src/sass/styles.scss',
        ]
        // vendor: 'jquery',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        // publicPath: "dist",
        compress: true,
        port: 8080,
        hot: false,
        inline: true,
        stats: 'errors-only',
        // proxy: {
        //     "/api/**": {
        //         target: "http://localhost:8080/",
        //         pathRewrite: {
        //             "^/api": ""
        //         }
        //     },
        // },
        open: true
    },

    // resolve: {
    //     modules: [
    //         path.join(__dirname, "src"),
    //         "node_modules"
    //     ]
    // },

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                exclude: /node_modules/,
                use: cssConfig
            },

            // Bootstrap 3
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                loader: 'imports-loader?jQuery=jquery'
            },

            // Bootstrap 4
            {
                test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
                loader: 'imports-loader?jQuery=jquery'
            },

            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000'
            }, {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: path.resolve(__dirname, 'src/view/index.html'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Sketch Design',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: path.resolve(__dirname, 'src/view/sketch.html'),
            filename: 'sketch.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Susy & Breakpoint Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: path.resolve(__dirname, 'src/view/susy.html'),
            filename: 'susy.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Cover Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: path.resolve(__dirname, 'src/view/cover.html'),
            filename: 'cover.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/styles.css',
            // disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 3 version']
                    })
                ]
            }
        })
    ]
}