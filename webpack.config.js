const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectRoot = path.resolve(__dirname, './')

module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? '#source-map' : false,
  entry: {
    app: [
      path.resolve(projectRoot, './src/main.js')
    ]
  },
  externals: {
    config: 'CONFIG'
  },
  output: {
    path: path.resolve(projectRoot, './dist'),
    filename: 'static/js/[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!stylus?sourceMap')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/i,
        loader: 'url',
        query: { limit: 10000 }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: { limit: 20000 }
      }
    ]
  },
  babel: {
    presets: ['es2015', 'stage-2']
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css?sourceMap'),
      stylus: ExtractTextPlugin.extract('css?sourceMap!stylus?sourceMap'),
      js: 'babel!eslint'
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(projectRoot, './static/**/*') }
    ]),
    new HtmlWebpackPlugin({
      filename: path.resolve(projectRoot, './dist/index.html'),
      template: path.resolve(projectRoot, './index.html'),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new ExtractTextPlugin('static/css/styles.css')
  ]
}
