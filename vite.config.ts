// https://vite.dev/config/

import { defineConfig } from 'vite'
import { resolve } from 'path'
import type { UserscriptPluginConfig } from 'vite-userscript-plugin'

// plugin
import preact from '@preact/preset-vite'
import svgr from 'vite-plugin-svgr'

/**
 * Create userscript header from environment
 * @param config
 * @param env
 * @returns        header config
 */
export const header = (
  config: Omit<UserscriptPluginConfig['header'], 'version'>,
  {
    npm_package_author: author,
    npm_package_license: copyright = 'CC0',
    npm_package_homepage: namespace,
    npm_package_version: version = '0.0.0',
  } = process.env,
) => {
  if (!namespace) {
    throw new Error('missing userscript namespace, is your package.json homepage unset?')
  }
  return {
    author,
    namespace,
    copyright,
    version,
    ...config,
  } as UserscriptPluginConfig['header']
}

// configuration
export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: '../../dist',
  },
  plugins: [preact(), svgr()],
  resolve: {
    alias: {
      '@util': resolve('./src/lib/util'),
      '@lib': resolve('./src/lib'),
    },
  },
})
