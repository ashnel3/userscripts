/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: 'tsconfig.json',
  },
  overrides: [
    {
      files: ['*.cjs', '*.js'],
      extends: ['standard', 'prettier'],
      rules: {
        'prettier/prettier': 1,
      },
    },
    {
      files: ['*.ts'],
      extends: ['standard-with-typescript', 'prettier'],
      rules: {
        'prettier/prettier': 1,
        '@typescript-eslint/no-non-null-assertion': 0,
      },
    },
  ],
}
