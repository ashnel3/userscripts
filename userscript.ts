import type { UserscriptMetadata } from './src/util/metadata'

const {
  npm_package_author: author,
  npm_package_homepage: namespace,
  npm_package_license: copyright,
} = process.env

/** Userscript metadata */
export const userscripts = {
  'favicon-store': {
    description: 'Store favicon URLs',
    name: 'favicon-store',
    namespace,
    author,
    grant: ['GM_setValue'],
    match: '*://**/*',
    copyright,
    version: '1.0.0',
  },
  'khinsider-album-dl': {
    description: 'Download khinsider albums',
    name: 'khinsider-album-dl',
    namespace,
    author,
    icon: 'https://downloads.khinsider.com/images/favicon.ico',
    grant: ['GM_download'],
    match: 'https://downloads.khinsider.com/game-soundtracks/album/*',
    exclude: 'https://downloads.khinsider.com/game-soundtracks/album/**/*',
    'run-at': 'document-end',
    copyright,
    version: '1.0.1',
  },
} satisfies Record<string, UserscriptMetadata>

export default userscripts
