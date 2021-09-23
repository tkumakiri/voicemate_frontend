module.exports = {
    root: true,
    env: {
        "browser": true,
        "es6": true,
        "node": true,
      },
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
        // disable the rule for all files
        "@typescript-eslint/explicit-module-boundary-types": "off"
      },
  };