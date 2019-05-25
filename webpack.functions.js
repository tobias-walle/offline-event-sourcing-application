const nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts']
  },
  optimization: { minimize: false },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
