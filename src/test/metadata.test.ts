import { expect, describe, test } from 'vitest'
import { parse, stringify, type UserscriptMetadata } from '../util/metadata'

/** Userscript metadata string */
const USERSCRIPT_STRING = `// ==UserScript==
// @description testing
// @name testing
// @match https://example.com/1
// @match https://example.com/2
// @match https://example.com/3
// ==/UserScript==
`

/** Userscript metadata object */
const USERSCRIPT_METADATA: UserscriptMetadata = {
  description: 'testing',
  name: 'testing',
  match: ['https://example.com/1', 'https://example.com/2', 'https://example.com/3'],
}

describe('metadata', () => {
  test('metadata parse should be reversible', () => {
    expect(parse(USERSCRIPT_STRING)).toStrictEqual(USERSCRIPT_METADATA)
  })

  test('metadata stringify should be reversible', () => {
    expect(stringify(USERSCRIPT_METADATA)).toBe(USERSCRIPT_STRING)
  })
})
