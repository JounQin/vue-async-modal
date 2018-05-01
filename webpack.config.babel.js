import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

export default {
  mode: NODE_ENV,
  resolve: {
    modules: ['lib', 'src', 'node_modules'],
    extensions: ['.vue', '.js', '.styl'],
    enforceExtension: false,
    enforceModuleExtension: false,
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: `[name].[${isProd ? 'contenthash' : 'hash'}].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  camelCase: true,
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]',
                },
              },
              'stylus-loader',
            ],
          },
          {
            use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(svg|woff2?|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      stylus: {
        default: {
          paths: 'node_modules/bootstrap-styl',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: 'Vue Async Modal',
    }),
    new VueLoaderPlugin(),
  ],
}
