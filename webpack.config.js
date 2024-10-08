import BannerPlugin from 'webpack/lib/BannerPlugin.js'
import TerserPlugin from 'terser-webpack-plugin'
import metadata from './metadata.js'
import path from 'path'
import { sveltePreprocess } from 'svelte-preprocess'

/** Input directory */
const input = 'packages'
/** Output directory */
const output = 'dist'

/** Build mode */
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const dev = mode === 'development'
const prod = mode === 'production'

/** Build sourcemaps */
const sourcemap = process.env.SOURCEMAP === 'true'

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
