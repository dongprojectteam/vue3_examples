const path = require('path')

module.exports = {
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js',
    '/@/': path.resolve(__dirname, './src'),
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@compositions/': path.resolve(__dirname, './src/compositions'),
    '/@store/': path.resolve(__dirname, './src/store'),
    '/@router/': path.resolve(__dirname, './src/router'),
  },
}
