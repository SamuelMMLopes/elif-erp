module.exports = {
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: false,
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
  },
}
