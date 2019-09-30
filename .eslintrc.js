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
    'no-console': 'off',
    'no-param-reassign': 'off',
    'react/state-in-constructor': 'off',
    'no-plusplus': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
  },
};
