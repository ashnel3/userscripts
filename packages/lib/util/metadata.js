/**
 * Userscript metadata
 * @class
 * @type {import('./metadata.d.ts').UserscriptMeta}
 */
export class UserscriptMeta {
  static TAG_END = '// ==/UserScript=='
  static TAG_START = '// ==UserScript==\n'
  static TAG_VALUE = '// @'
  antifeature = []
  compatible = []
  connect = []
  excludeMatches = []
  exclude = []
  excludes = []
  grant = []
  includes = []
  match = []
  matches = []
  require = []
  resources = []

  static TAG_ARRAY(key, values) {
    return values.map((v) => this.TAG_STR(key, v)).join('')
  }

  static TAG_BOOL(key, value) {
    return `${this.TAG_VALUE}${key}${value ? '' : ' false'}\n`
  }

  static TAG_STR(key, value) {
    return `${this.TAG_VALUE}${key} ${value}\n`
  }

  static parse(scriptMetaStr = GM.info.scriptMetaStr) {
    const metadata = new this({})
    scriptMetaStr.split('\n').forEach((line) => {
      const [f, k, v] = /^\/\/ @([\w\d.-]+)\s?(.*)$/.exec(line) ?? []
      if (typeof f !== 'string') {
        return
      }
      // parsed value
      const value =
        v === 'true' || v === 'false'
          ? v === 'true'
          : !v.includes('.') && !isNaN(parseInt(v, 10))
            ? parseInt(v, 10)
            : v
      metadata[k] =
        typeof metadata[k] === 'undefined'
          ? value // assignment
          : Array.isArray(metadata[k])
            ? [...metadata[k], value] // merge arrays
            : [metadata[k], value] // create new array
    })
    return metadata
  }

  /**
   * Stringify metadata
   * @param {import('./metadata.d.ts').UserscriptMetaData} metadata
   * @returns {string}
   */
  static stringify(metadata) {
    return (
      Object.entries(metadata).reduce((acc, [key, value]) => {
        switch (typeof value) {
          case 'boolean':
            return acc + this.TAG_BOOL(key, value)
          case 'number':
            return acc + this.TAG_STR(key, value.toString())
          case 'string':
            return acc + this.TAG_STR(key, value)
          case 'undefined':
            return acc
          case 'object':
            if (value === null) {
              return acc
            } else if (Array.isArray(value)) {
              return acc + this.TAG_ARRAY(key, value)
            }
          // allow fallthrough for objects
          default:
            throw new Error(`failed stringify for unsupported type '${typeof value}'!`)
        }
      }, this.TAG_START) + this.TAG_END
    )
  }

  /**
   * @param {import('./metadata.d.ts').UserscriptMetaData} data
   */
  constructor(data) {
    Object.assign(this, data)
  }

  /**
   * @returns {import('./metadata.d.ts').UserscriptMetaData}
   */
  toJSON() {
    return this
  }

  /**
   * @returns {string}
   */
  toString() {
    return UserscriptMeta.stringify(this)
  }
}

export default UserscriptMeta
