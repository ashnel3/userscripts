import UserscriptMeta from './packages/lib/util/metadata.js'

const {
  npm_package_homepage: namespace,
  npm_package_license: copyright,
  npm_package_author: author,
} = process.env

/**
 * Userscript metadata
 * @type {UserscriptMeta[]}
 */
export default [
  new UserscriptMeta({
    'config.cover-format': 'cover ({index}).{ext}',
    'config.track-format': '({index}) {title} - {album}.{ext}',
    author,
    description: 'download "downloads.khinsider.com" vgm albums',
    icon: 'https://downloads.khinsider.com/images/favicon.ico',
    grant: ['GM_download'],
    name: 'khinsider-dl',
    namespace,
    match: ['https://downloads.khinsider.com/game-soundtracks/album/*'],
    exclude: ['https://downloads.khinsider.com/game-soundtracks/album/**/*'],
    copyright,
    'run-at': 'document-end',
    version: '2.0.0',
  }),
  new UserscriptMeta({
    name: 'github-dl',
    description: 'export github repositories',
    version: '1.0.0',
    'config.branch': '',
    'config.skip-forks': false,
    /** Can either be "tarball" or "zipball". */
    'config.format': 'zipball',
    author,
    icon: 'https://github.com/favicon.ico',
    grant: ['GM_download'],
    namespace,
    match: ['https://github.com/*'],
    exclude: [
      'https://github.com/',
      'https://github.com/new',
      'https://github.com/notifications',
      'https://github.com/settings',
      'https://github.com/**/*',
    ],
    'run-at': 'document-end',
    copyright,
  }),
]
