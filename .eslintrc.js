module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    WARHOL_HOST: 'readonly',
    WARHOL_PORT: 'readonly',
  },
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
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'max-len': 'off',
    'no-use-before-define': 'off',
    'prefer-destructuring': 'warn',
    'react/no-string-refs': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
  },
};
