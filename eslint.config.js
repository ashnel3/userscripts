import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-plugin-prettier/recommended'

import svelteParser from 'svelte-eslint-parser'
import tsEslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config} */
export default [
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.greasemonkey,
      },
      parser: svelteParser,
      parserOptions: { parser: tsEslint.parser },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.greasemonkey } },
  },
]
