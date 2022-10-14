// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const webpack = require('webpack')
const path = require('path')
 
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
 
module.exports = {
  // 基本路径  3.6之前的版本时 baseUrl
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    // hotOnly: false
  },
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]}),
      new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]}),
      new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]}),
      new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]}),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      }),
      new NodePolyfillPlugin()
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  }
};