import { writeFile } from 'fs/promises'
import path from 'path'
import prettier from 'prettier'
import { userscriptMetadata } from '../webpack.config'

/** Template README */
const tREADME = (): string => {
  return `# userscripts
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/ashnel3/userscripts/main.yml?label=tests)](https://github.com/ashnel3/userscripts/actions) ![GitHub Stars](https://img.shields.io/github/stars/ashnel3/userscripts)

Miscellaneous Userscripts.

### Requirements:
A userscript manager:
  - [ViolentMonkey](https://violentmonkey.github.io/) _(recommended)_
  - [GreaseMonkey](https://www.greasespot.net/)
  - [TamperMonkey](https://www.tampermonkey.net/)

### Scripts:
| Name | Description | Install | Version |
|---|---|
${Object.entries(userscriptMetadata)
  .map(
    ([name, meta]) =>
      `| ${name} | ${meta.description} | [install](https://github.com/ashnel3/userscripts/raw/build/${name}.user.js) | ${meta.version}`,
  )
  .join('\n')}
`
}

// main
void (async () => {
  const [outDir] = process.argv.slice(2)
  await writeFile(
    path.join(outDir ?? process.cwd(), 'README.md'),
    await prettier.format(tREADME(), { parser: 'markdown' }),
  )
})()
