import TerserWebpackPlugin from 'terser-webpack-plugin'
import { BannerPlugin, type Configuration } from 'webpack'
import path from 'path'
import { stringify, type UserscriptMetadata } from './src/util/metadata'
import { userscripts } from './userscript'

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

/**
 * Create webpack BannerPlugin from userscript metadata
 * @param meta
 * @returns
 */
const createMetadataBannerPlugin = (metadata: UserscriptMetadata): BannerPlugin => {
  return new BannerPlugin({
    banner: stringify(metadata),
    raw: true,
    include: [metadata.name],
  })
}

/** Webpack configuration */
const config: Configuration = {
  devtool,
  entry: {
    'favicon-store': path.join(cwd, input, 'favicon-store.ts'),
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
    createMetadataBannerPlugin(userscripts['favicon-store']),
    createMetadataBannerPlugin(userscripts['khinsider-album-dl']),
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
}
export default config
