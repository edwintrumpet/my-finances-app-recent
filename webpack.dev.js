/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config({ path: './.env.dev' }).parsed;
  const envKeys = Object.keys(env).reduce((accumulator, current) => ({ ...accumulator, [`process.env.${current}`]: JSON.stringify(env[current]) }), {});

  return {
    entry: {
      home: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,

        },
      ],
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      disableHostCheck: false,
      open: true,
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HTMLWebpackPlugin({
        title: 'My finances',
        hash: false,
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
