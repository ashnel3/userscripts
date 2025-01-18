// https://vite.dev/config/

import { defineConfig } from 'vite'
import { resolve } from 'path'

// plugin
import preact from '@preact/preset-vite'
import userscript from 'vite-userscript-plugin'
import svgr from 'vite-plugin-svgr'

// configuration
export default defineConfig(() => {
  const {
    npm_package_author: author,
    npm_package_license: copyright,
    npm_package_homepage: namespace,
  } = process.env
  return {
    plugins: [
      preact(),
      svgr(),
      userscript({
        entry: './src/script/github-dl/index.tsx',
        header: {
          name: 'github-dl',
          namespace,
          description: 'github account backup',
          version: '1.0.0',
          author,
          copyright,
          icon: 'https://github.com/favicon.ico',
          match: 'https://github.com/*',
          exclude: ['https://github.com/'],
          'run-at': 'document-end',
        },
      }),
    ],
    resolve: {
      alias: {
        '@assets': resolve('./src/assets'),
        '@util': resolve('./src/lib/util'),
        '@lib': resolve('./src/lib'),
        '@script': resolve('./src/script'),
      },
    },
  }
})
