import dir from 'path-reader';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


let dirFiles = dir.files('./public',{sync:true, shortName:true, excludeHidden:true, recursive:false});
let HtmlPlugin = [];
for(let i=0; i<dirFiles.length; i++) {
    let arr = dirFiles[i].split('.');
    if(arr.length===2 && arr[1]==='pug') {
        HtmlPlugin.push(
            new HtmlWebpackPlugin({
                filename: arr[0] + '.html',
                template: './public/' + dirFiles[i]
            }),
        );
    }
}


const config = {
    name: 'config',

    entry: [
        './public/scripts/script.js'
        // './public/test.pug'
    ],
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: '[name].js'
    },

    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 100
    // },
    //
    // devtool: false,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // {
            //     test: /\.less$/,
            //     use: 'less-loader'
            // },
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: path.resolve(__dirname, '../build/images')
                    }
                }
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-html-loader',
                    options: {

                    }
                }
            }
            // {
            //     test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             outputPath: path.resolve(__dirname, '../build/images')
            //         }
            //     }
            // },
            // {
            //     test: /\.(woff|woff2|ttf|eot)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             outputPath: path.resolve(__dirname, '../build/fonts')
            //         }
            //     }
            // }
        ]
    },

    plugins: [
        ...HtmlPlugin
    ]
};

export default [config];