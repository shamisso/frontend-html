import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';


// Список шаблонов в директории ./src без расщирения
let HtmlTemplates = [
    'index'
];


let HtmlPlugin = [];
for(let i=0; i<HtmlTemplates.length; i++) {
    HtmlPlugin.push(
        new HtmlWebpackPlugin({
            filename: HtmlTemplates[i] + '.html',
            template: HtmlTemplates[i] + '.pug',
            inject: 'body'
        })
    );
}



const config = {
    name: 'config',
    devtool: 'eval',
    context: path.resolve(__dirname, "../src"),
    entry: [
        './scripts/script.js',
        './styles/style.scss'
    ],

    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: (loader) => [
                                        require('autoprefixer')()
                                    ]
                                }
                            }
                        ]
                    })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                	  publicPath: '../',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: (loader) => [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        limit: 100000
                    }
                },
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?.+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000
                    }
                }
            }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin(['build/*'], {root: path.resolve(__dirname, "../")}),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: "styles/[name].css",
            allChunks: true
        }),
          
        ...HtmlPlugin,
    
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],

    resolve: {
        alias: {
        }
    }
};

export default [config];