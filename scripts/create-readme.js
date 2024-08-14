import fs from 'fs/promises'
import path from 'path'
import prettier from 'prettier'
import { input, metadata } from '../webpack.config.js'

/**
 * template link
 * @private
 * @param {string} name
 * @param {string} url
 * @returns {string}
 */
const tLink = (name, url) => `[${name}](${url})`

/**
 * template table row
 * @param  {...string} args
 * @returns {string}
 */
const tRow = (...args) => `| ${args.join('|')} |\n`

/**
 * template readme
 * @returns {Promise<string>}
 */
const template = async () => {
  return await prettier.format(
    `# userscripts
<br />
<br />
<p align="center">
  <img width="33%" src="./${input}/lib/asset/extension.svg" />
</p>
<br />
<p align="center">miscellaneous <a href="https://en.wikipedia.org/wiki/Userscript">userscripts</a></p>

## Requirements:

Requires a userscript manager.

- ${tLink('ViolentMonkey', 'https://violentmonkey.github.io')} _(recommended)_
- ${tLink('GreaseMonkey', 'https://www.greasespot.net')}
- ${tLink('TamperMonkey', 'https://www.tampermonkey.net/')}

## Scripts:
| Name | Description | Version | Install |
| --- | --- | --- | --- |
${metadata
  .map(({ name, description, version }) =>
    tRow(
      tLink(name, `./${input}/${name}`),
      description ?? '...',
      version,
      tLink('install', `https://github.com/ashnel3/userscripts/raw/build/${name}.user.js`),
    ),
  )
  .join('')}`,
    { parser: 'markdown' },
  )
}

// main
void (async () => {
  await fs.writeFile(path.resolve(process.argv[2] ?? process.cwd(), 'README.md'), await template())
})()
