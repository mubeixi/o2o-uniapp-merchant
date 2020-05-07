module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard',
  ],
  globals: {
    plus:'readonly',
    uni: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'vue',
  ],
  rules: {
    'camelcase': 0,
    'no-prototype-builtins': 0,
    'no-throw-literal': 0,
  },
}
