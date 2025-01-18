export const DEFAULT_STYLES = 'color: #a6e22a; background: #000'

export const log = (message: string, styles = DEFAULT_STYLES) => {
  console.log(`%c[${GM_info.script.name}]:`, styles, message)
}

export default log
