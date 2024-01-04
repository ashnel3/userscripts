import { writeFile } from 'fs/promises'
import path from 'path'
import prettier from 'prettier'
import { userscriptMetadata } from '../webpack.config'

/** Template README */
const tREADME = (): string => {
  return `# userscripts
Miscellaneous userscripts

### Requirements
A userscript manager:
  - [ViolentMonkey](https://violentmonkey.github.io/) _(recommended)_
  - [GreaseMonkey](https://www.greasespot.net/)
  - [TamperMonkey](https://www.tampermonkey.net/)

### Scripts
| Name | Install |
|---|---|
${Object.entries(userscriptMetadata)
  .map(
    ([name, meta]) =>
      `| ${name} | [install](https://github.com/ashnel3/userscripts/raw/build/${name}.user.js) |`,
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
