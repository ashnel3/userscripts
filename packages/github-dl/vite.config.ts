import defineUserscriptConfig from '@userscripts/lib/config'

export default defineUserscriptConfig('./src/index.tsx', {
  name: 'github-dl',
  icon: 'https://github.com/favicon.ico',
  match: ['http*://github.com/*'],
  'run-at': 'document-end',
})
