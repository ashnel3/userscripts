import { BannerPlugin as BannerWebpackPlugin } from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import metadata, { type UserscriptMetadata } from './src/util/metadata'
import path from 'path'
import type { Configuration } from 'webpack'

const cwd = process.cwd()
const input = 'src'
const output = 'dist'

/** Build mode */
const mode: 'development' | 'production' =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

/**
 * Build development tooling
 * @type {string | undefined}
 */
const devtool = process.env.DEVTOOL

/** Script author */
const author = process.env.npm_package_author ?? '???'
/** Script namespace */
const namespace = process.env.npm_package_homepage ?? '???'
/** Script license */
const copyright = process.env.npm_package_license ?? '???'

/** Userscript metadata by chunk-name */
export const userscriptMetadata: Record<string, UserscriptMetadata> = {
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
    version: '1.0.0',
  },
}

/** Webpack configuration */
export default {
  devtool,
  entry: {
    'khinsider-album-dl': path.join(cwd, input, 'khinsider-album-dl.ts'),
  },
  externals: {
    '@violentmonkey/dom': 'VM',
    '@violentmonkey/ui': 'VM',
  },
  output: {
    filename: '[name].user.js',
    path: path.join(cwd, output),
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.ts'],
  },
  target: ['browserslist'],
  mode,
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
    ],
  },
  plugins: [
    new BannerWebpackPlugin({
      banner: metadata.stringify(userscriptMetadata['khinsider-album-dl']),
      raw: true,
      include: ['khinsider'],
    }),
  ],
  optimization: {
    minimize: mode === 'production',
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments:
              /(==\/?UserScript==|@(author|config|copyright|description|exclude|grant|icon|include|license|match|namespace|name|noframes|preserve|require|resource|run-at|version))/,
          },
        },
      }),
    ],
  },
} satisfies Configuration
