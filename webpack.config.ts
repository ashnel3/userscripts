import TerserWebpackPlugin from 'terser-webpack-plugin'
import { BannerPlugin, type Configuration } from 'webpack'
import path from 'path'
import meta from './src/util/metadata'
import userscripts from './userscript'

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

/** Webpack configuration */
const config: Configuration = {
  devtool,
  entry: Object.keys(userscripts).reduce(
    (acc, cur) => ({ ...acc, [cur]: path.join(cwd, input, cur) }),
    {},
  ),
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
  plugins: Object.values(userscripts).map((data) => {
    return new BannerPlugin({
      banner: meta.stringify(data),
      raw: true,
      include: [data.name],
    })
  }),
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
