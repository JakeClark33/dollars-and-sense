const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require("path");

const config = {
    entry: './public/js/index.js',
    output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.bundle.js'
        },
        module: {
            rules: [
              {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      esModule: false,
                      name(file) {
                        return '[path][name].[ext]';
                      },
                      publicPath(url) {
                        return url.replace('../', '/public/');
                      }
                    }
                  },
                  {
                    loader: 'image-webpack-loader'
                  }
                ]
              }
            ]
          },
          plugins: [
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
            }),
            new BundleAnalyzerPlugin({
              analyzerMode: 'static'
            }),
            
              ],
            
              mode: 'development'
        };
        
        module.exports = config;
        