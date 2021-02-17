const path = require('path')

module.exports = {
  entry: {
    'notes-app': './src/notes-app.js',
    'edit-page': './src/edit-page.js' 
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/scripts')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: []
        }
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
    inline: true,
    hot: true,
    watchContentBase: true
  }
}