const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CompressionPlugin({
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
      compressionOptions: {
        numiterations: 15,
      },
      deleteOriginalAssets: true,
      exclude: /.+\.(html|ico)/,
    }),
  );
}

module.exports = {
  configureWebpack: {
    plugins,
  },
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
};
