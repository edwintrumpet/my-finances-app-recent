/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
  let environment;
  if (env) {
    environment = env;
  } else {
    environment = dotenv.config().parsed;
  }

  const envKeys = Object.keys(environment).reduce((accumulator, current) => ({ ...accumulator, [`process.env.${current}`]: JSON.stringify(environment[current]) }), {});

  return {
    entry: {
      home: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,

        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'My Finances',
        hash: true,
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new webpack.DllReferencePlugin({
        manifest: require('./modules-manifest.json'),
        context: path.resolve(__dirname, 'src'),
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
