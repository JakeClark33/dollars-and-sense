const webpack = require('webpack');
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
            new WebpackPwaManifest({
              name: 'Dollars And Sense',
              short_name: 'Balance',
              description: 'An app that allows you to view and update your budget.',
              start_url: '../index.html',
              background_color: '#01579b',
              theme_color: '#ffffff',
              fingerprints: false,
              inject: false,
              icons: [
                {
                  src: path.resolve('assets/img/icons/icon-512x512.png'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: path.join('assets', 'icons')
                }
              ]
            })
          ],
          mode: 'development'
        };
        
        module.exports = config;
        