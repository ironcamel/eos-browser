module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-classes-per-file': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'one-var-declaration-per-line': 'off',
    'one-var': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',
  },
};
