import { mergeConfig, type UserConfigFn, type UserConfig } from 'vite'
import { readFile } from 'node:fs/promises'

// plugins
import icons from 'unplugin-icons/vite'
import preact from '@preact/preset-vite'
import userscript, { type UserscriptPluginConfig } from 'vite-userscript-plugin'

export type UserscriptHeaders = UserscriptPluginConfig['header']

/**
 * load userscript headers
 * @param headers - header overrides
 * @returns userscript headers
 */
export const defineHeaders = async (
  headers: Partial<UserscriptHeaders>,
): Promise<UserscriptHeaders> => {
  const packageJSON = JSON.parse((await readFile('./package.json')).toString())
  const base: UserscriptPluginConfig['header'] = {
    name: packageJSON.name,
    description: packageJSON.description,
    version: packageJSON.version ?? '0.0.0',
    author: packageJSON.author,
    copyright: packageJSON.license,
    match: [],
  }
  return Object.assign(base, headers)
}

/**
 * create userscript vite config
 * @param entry     - userscript filepath
 * @param headers   - userscript headers
 * @param overrides - vite config overrides
 * @returns vite config
 */
export const defineUserscriptConfig =
  (
    entry: string,
    headers: Partial<UserscriptHeaders> = {},
    overrides: UserConfig = {},
  ): UserConfigFn =>
  async (): Promise<UserConfig> => {
    return mergeConfig(
      {
        plugins: [
          icons({ compiler: 'jsx', jsx: 'preact' }),
          preact(),
          userscript({
            entry,
            header: await defineHeaders(headers),
          }),
        ],
      },
      overrides,
    )
  }

export default defineUserscriptConfig
