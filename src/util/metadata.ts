export interface UserscriptMetadata extends Partial<VMScriptGMInfoScriptMeta> {
  name: string
  copyright?: string
  exclude?: string | string[]
  match?: string | string[]
  'run-at'?: VMScriptGMInfoScriptMeta['runAt']
  [key: string]: unknown
}

export const USERSCRIPT_START = '// ==UserScript==\n'
export const USERSCRIPT_END = '// ==/UserScript==\n'
export const USERSCRIPT_BOOL = (k: string, v: boolean): string => `// @${k}${v ? '' : ' false'}\n`
export const USERSCRIPT_VALUE = (k: string, v: string): string => `// @${k} ${v}\n`
export const USERSCRIPT_ARRAY = (k: string, arr: string[]): string => {
  return arr.map((v) => USERSCRIPT_VALUE(k, v)).join('')
}

/**
 * Parse userscript metadata block
 * @param scriptMetaStr  Metadata string
 * @returns              Metadata object
 */
export const parse = <T extends UserscriptMetadata = UserscriptMetadata>(
  scriptMetaStr = GM.info.scriptMetaStr,
): T => {
  const parseValue = (v: string): unknown => {
    if (!v.includes('.') && !isNaN(parseInt(v, 10))) {
      return parseInt(v, 10)
    } else if (v === 'true' || v === 'false') {
      return v === 'true'
    } else {
      return v
    }
  }
  return scriptMetaStr.split('\n').reduce(
    (acc, line) => {
      if (!line.startsWith('// @')) return acc
      const iSpace = line.indexOf(' ', 4)
      const isFlag = iSpace < 0
      const key = line.substring(4, isFlag ? undefined : iSpace)
      const value = isFlag ? true : parseValue(line.substring(iSpace + 1))
      if (key in acc) {
        return {
          ...acc,
          [key]: [...(Array.isArray(acc[key]) ? acc[key] : [acc[key]]), value],
        }
      } else {
        return { ...acc, [key]: value }
      }
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as any,
  )
}

/**
 * Stringify userscript metadata
 * @param metadata  Metadata object
 * @returns         Metadata string
 */
export const stringify = <T extends UserscriptMetadata = UserscriptMetadata>(
  metadata: T,
): string => {
  return (
    USERSCRIPT_START +
    Object.entries(metadata).reduce((acc, [k, v]) => {
      const type = typeof v
      switch (type) {
        case 'undefined':
          return acc
        case 'boolean':
          return acc + USERSCRIPT_BOOL(k, v as boolean)
        case 'number':
        case 'string':
          return acc + USERSCRIPT_VALUE(k, v as string)
        case 'object':
          if (Array.isArray(v)) {
            return acc + USERSCRIPT_ARRAY(k, v as string[])
          }
        // eslint-disable-next-line no-fallthrough
        default:
          throw new Error(`unsupported type "${type}"!`)
      }
    }, '') +
    USERSCRIPT_END
  )
}

export default {
  parse,
  stringify,
}
