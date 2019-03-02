module.exports = {
  root: true,
  env: {
    node: true,
  },
  /* elsint:disable */
  extends: ['plugin:vue/recommended',
    'vuetify',
    'prettier'],
  rules: {
    /* elsint:disable */
    'array-element-newline': ['error',
      'always'],
    /* elsint:disable */
    'comma-dangle': ['error',
      'always-multiline'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        outerIIFEBody: 1,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    /* elsint:disable */
    semi: ['error',
      'always'],
    'sort-imports': ['error'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 0,
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 1,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
