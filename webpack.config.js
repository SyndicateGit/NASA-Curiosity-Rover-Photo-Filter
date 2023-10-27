const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
  mode: 'development',
  entry: './src/index.js',

  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
        inject: false, 
        hash: true,
        template: './src/index.html',
        filename: 'index.html',
        title: 'Curiosity Rover Photo Search',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

};