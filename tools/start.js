/**
 * Created by Алексей Чернышов on 18.01.2018.
 */
import path from 'path';

import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevServer from 'webpack-dev-server';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const isDevelopment = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

function start()
{
    const config = webpackConfig.find(conf => conf.name === 'config');
    // config.entry.push(
    //       'webpack/hot/dev-server',
    //       'webpack-dev-server/client?http://localhost:' + PORT
    // );
    // config.output.publicPath = 'http://localhost:' + PORT + '/';
    // config.plugins.unshift(
    //       new webpack.HotModuleReplacementPlugin()
    // );
    
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler,{
        publicPath: config.output.publicPath,
        hot: false,
        inline: false,
        stats: { colors: true },
        watchOptions: {
            aggregateTimeout: 100,
        }
    });

    // https://github.com/webpack/webpack-dev-middleware
    // server.use(
    //     webpackDevMiddleware(compiler, {
    //         publicPath: config.output.publicPath
    //     }),
    // );

    // https://github.com/glenjamin/webpack-hot-middleware
    // server.use(webpackHotMiddleware(compiler));
    
    server.listen(PORT, 'localhost', function (err) {
        if (err) {
            console.log(err);
        }
        console.info('http://localhost:' + PORT + '/');
    });
}

module.exports = start();