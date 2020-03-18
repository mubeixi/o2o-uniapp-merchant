const path = require('path');
var prod = process.env.NODE_ENV === 'production';

// 使用 UglifyJS 对编译后的代码进行打混淆压缩。
const UglifyPlugin = require('@wepy/plugin-uglifyjs');

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['static'],
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: [
    UglifyPlugin()
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};
