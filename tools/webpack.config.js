import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
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
        'scripts/script.js',
        'styles/style.scss'
    ],

    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         // sourceMap: true,
                        //         // plugins: () =>{
                        //         //     require('autoprefixer')
                        //         // }
                        //     }
                        // },
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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: { loader: 'url-loader', options: { limit: 100000 } },
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/,
                use: [ 'file-loader' ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['build/*'], {root: path.resolve(__dirname, "../")}),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),

        ...HtmlPlugin

        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
    ]
};

export default [config];