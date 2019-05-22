import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

const webpackConfig: Configuration = {
  entry: './src/client/index.tsx',
  resolve: {
    extensions: [ '.js', '.jsx', '.tsx', '.ts']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'client')
  },
  devServer: {
    proxy: {
      '/.netlify': 'http://localhost:8000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
    })
  ]
};

export default webpackConfig;
