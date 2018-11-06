import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { manifestPlugin } from './base.config';
import { appConfig as devAppConfig, swConfig as devSwConfig } from './dev.config';

const appConfig: webpack.Configuration = {
  ...devAppConfig,

  mode: 'development',

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('pre'),
      },
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    manifestPlugin,
  ],
};

const swConfig: webpack.Configuration = {
  ...devSwConfig,

  mode: 'development',

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('pre'),
      },
    }),
  ],
};

const configs = [appConfig, swConfig];

export default configs;
