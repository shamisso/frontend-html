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
const options = {
  contentBase: './build',
  hot: false,
  host: 'localhost'
};

function start()
{
    const config = webpackConfig.find(conf => conf.name === 'config');

    // https://webpack.js.org/guides/hot-module-replacement/#via-the-node-js-api
    webpackDevServer.addDevServerEntrypoints(config, options);

    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);

    server.listen(PORT, 'localhost', () => {
        console.log('dev server listening on port http://localhost:' + PORT);
    });
}

module.exports = start();