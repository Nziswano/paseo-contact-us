const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vendorPackages = require('./package.json')
const combineLoaders = require('webpack-combine-loaders')
const StylelintPlugin = require('stylelint-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let hostEnv

const setupEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      hostEnv = true
      break
    default:
      hostEnv = false
      break
  }
}

setupEnv()

module.exports = {
  entry: {
    app: './src/app/ts/app.ts',
    vendor: Object.keys(vendorPackages.dependencies).filter(name => (name !== 'font-awesome' && name !== 'csspin'))
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      async: true,
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      __IS_PROD__: hostEnv
    }),
    new StylelintPlugin({syntax: 'scss', emitErrors: false, lintDirtyModulesOnly: true}),
    new HtmlWebpackPlugin(
      {
        title: 'Webpack Prototype',
        template: 'src/templates/template.html'
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: combineLoaders([
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ])
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: combineLoaders([
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ])
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules(\/?!foundation-sites)/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'awesome-typescript-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ['vue-style-loader', {
              loader: 'css-loader',
              options: {
                minimize: false,
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              exclude: /styles/,
              options: {
                includePaths: ['./src/scss'],
                data: '@import "./src/scss/app";',
                sourceMap: false
              }
            }
            ],
            ts: 'awesome-typescript-loader'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules(\/?!font-awesome)/,
        loader: 'file-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        exclude: /node_modules(\/?!font-awesome)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    open: false
  }
}

if (process.env.PLUGIN === 'plugin') {
  module.exports.entry = {
    contactus: './src/app/ts/components/ContactUs/index.vue',
    vendor: Object.keys(vendorPackages.dependencies).filter(name => (name !== 'font-awesome' && name !== 'csspin'))
  }

  module.exports.output = {
    path: path.resolve(__dirname, 'plugin'),
    filename: 'contactus.min.js'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebPackPlugin(['./dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
