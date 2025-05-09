module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    // 'sort-class-members',
    // 'import',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // 'sort-class-members/sort-class-members': [
    //   'error',
    //   {
    //     order: [
    //       '[static-properties]',
    //       '[static-methods]',
    //       '[properties]',
    //       '[conventional-private-properties]',
    //       'constructor',
    //       '[methods]',
    //       '[conventional-private-methods]',
    //     ],
    //     accessorPairPositioning: 'getThenSet',
    //   },
    // ],

    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    //     'newlines-between': 'always',
    //   },
    // ],
  },
};
