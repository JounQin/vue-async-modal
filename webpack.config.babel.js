import path from 'path'

import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProduction = NODE_ENV === 'production'

export default {
  resolve: {
    modules: ['lib', 'src', 'node_modules'],
    extensions: ['.vue', '.js', '.styl'],
    enforceExtension: false,
    enforceModuleExtension: false
  },
  devtool: !isProduction && 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: `[name].[${isProduction ? 'chunkhash' : 'hash'}].js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude: /\bnode_modules\b/
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            cssModules: {
              camelCase: true
            }
          }
        }
      },
      {
        test: /\.(svg|woff2?|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      stylus: {
        default: {
          paths: 'node_modules/bootstrap-styl'
        }
      }
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlPlugin({
      template: 'src/index.ejs',
      title: 'Vue Async Modal',
      minify: isProduction && {
        collapseWhitespace: true,
        minifyJS: true
      }
    })
  ]
}
