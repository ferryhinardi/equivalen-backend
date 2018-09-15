module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
    mocha: true,
    'jest/globals': true
  },
  plugins: ['jest'],
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  },
  rules: {
    'class-methods-use-this': 0
  }
};
