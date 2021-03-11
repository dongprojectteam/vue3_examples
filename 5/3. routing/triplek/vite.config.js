const path = require('path')

module.exports = {
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js',
    '/@/': path.resolve(__dirname, './src'),
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@app_modules/': path.resolve(__dirname, './src/modules'),
    '/@store/': path.resolve(__dirname, './src/store'),
    '/@router/': path.resolve(__dirname, './src/router'),
  },
}
