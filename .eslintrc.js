// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'error',
      '4'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    // 'quotes': [
    //   'error',
    //   'single'
    // ],
    'semi': [
      'error',
      'always'
    ],
    'prefer-const': [
      'error', {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }
    ],
    'no-extra-parens': [
      'error', 
      'all'
    ]
        
  }
};
