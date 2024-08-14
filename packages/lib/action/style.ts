import type { Action } from 'svelte/action'

export type Styles = Partial<Record<keyof CSSStyleDeclaration, string>>

/**
 * format css key
 * @private
 * @internal
 * @param key
 * @returns
 */
const fKey = (key: string): string => key.replace(/([A-Z])/g, '-$1').toLowerCase()

/**
 * style svelte action
 *
 * allows for inline css using the style tag
 * @param node
 * @param styles
 */
export const style: Action<HTMLElement, Styles> = (node, styles): void => {
  Object.entries(styles).forEach(([k, v]) => {
    node.style.setProperty(fKey(k), v ?? null)
  })
}

/**
 * serialize css string
 * @param styles  styles object
 * @returns       styles string
 */
export const styleSerialize = (styles: Styles): string => {
  return Object.entries(styles)
    .map(([k, v]) => `${fKey(k)}:${v}`)
    .join(';')
}

export default style
