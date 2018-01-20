/**
 * Created by Алексей Чернышов on 18.01.2018.
 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const isDevelopment = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

function start()
{
    const server = express();

    const config = webpackConfig.find(conf => conf.name === 'config');

    config.watch = true;
    config.watchOptions = {
        aggregateTimeout: 100
    };


    const compiler = webpack(config);

    // https://github.com/webpack/webpack-dev-middleware
    server.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath
        }),
    );

    // https://github.com/glenjamin/webpack-hot-middleware
    server.use(webpackHotMiddleware(compiler));

    server.get('/', (req, res) => {
        res.sendfile('./index.html');
    });

    server.listen(PORT);

    console.info('http://localhost:' + PORT + '/');

    // BrowserSync.create()
    //     .init({
    //         // https://www.browsersync.io/docs/options
    //         server: 'public',
    //         middleware: [server],
    //         open: 'local',
    //     });
}

module.exports = start();