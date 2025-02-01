import { mergeConfig } from 'vite'
import base, { header } from '../../vite.config'

// plugins
import userscript from 'vite-userscript-plugin'

export default mergeConfig(base, {
  plugins: [
    userscript({
      entry: './src/index.tsx',
      header: header({
        name: 'github-dl',
        description: 'github account backup',
        icon: 'https://github.com/favicon.ico',
        match: 'https://github.com/*',
        exclude: ['https://github.com/'],
        'run-at': 'document-end',
      }),
    }),
  ],
})
