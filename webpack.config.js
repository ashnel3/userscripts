import BannerPlugin from 'webpack/lib/BannerPlugin.js'
import TerserPlugin from 'terser-webpack-plugin'
import UserscriptMeta from './packages/lib/util/metadata.js'
import path from 'path'
import { sveltePreprocess } from 'svelte-preprocess'

/** Input directory */
export const input = 'packages'
/** Output directory */
export const output = 'dist'

const {
  npm_package_homepage: namespace,
  npm_package_license: copyright,
  npm_package_author: author,
} = process.env

/** Build mode */
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const dev = mode === 'development'
const prod = mode === 'production'

/** Build sourcemaps */
const sourcemap = process.env.SOURCEMAP === 'true'

/**
 * Userscript metadata
 * @type {UserscriptMeta[]}
 */
export const metadata = [
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
]

/** @type {import('webpack').Configuration} */
export default {
  devtool: sourcemap && 'inline-source-map',
  entry: metadata.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.name]: path.resolve(input, cur.name),
    }),
    {},
  ),
  output: {
    filename: '[name].user.js',
    path: path.resolve(output),
  },
  resolve: {
    alias: {
      $action: path.resolve(input, 'lib/action'),
      $asset: path.resolve(input, 'lib/asset'),
      $lib: path.resolve(input, 'lib'),
      $util: path.resolve(input, 'lib/util'),
      svelte: path.resolve('node_modules/svelte/src/runtime'),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', '...'],
    conditionNames: ['svelte', 'browser', '...'],
  },
  mode,
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'esbuild-loader',
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: { dev, css: 'none' },
            preprocess: sveltePreprocess(),
          },
        },
      },
    ],
  },
  optimization: {
    minimize: prod,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: true,
          mangle: true,
          format: {
            comments:
              /(==\/?UserScript==|@(author|config|copyright|description|exclude|grant|icon|include|license|match|namespace|name|noframes|preserve|require|resource|run-at|version))/,
          },
        },
      }),
    ],
  },
  plugins: [
    ...metadata.map(
      (m) =>
        new BannerPlugin({
          banner: m.toString(),
          include: [m.name],
          raw: true,
        }),
    ),
  ],
}
