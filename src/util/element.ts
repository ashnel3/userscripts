export type ElementStyleOptions = Record<string, string>

export interface ElementCreateOptions {
  classlist?: string[]
  children?: Array<ElementCreateOptions & { tagName: keyof HTMLElementTagNameMap }>
  innerText?: string
  styles?: ElementStyleOptions
}

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  opts: ElementCreateOptions,
): HTMLElementTagNameMap[T] => {
  const e = styleElement(document.createElement(tagName), opts.styles, opts.classlist)
  if (typeof opts.innerText === 'string') {
    e.innerText = opts.innerText
  }
  opts.children?.forEach((o) => {
    e.appendChild(createElement(o.tagName, o))
  })
  return e
}

export const styleElement = <T extends HTMLElement>(
  e: T,
  styles: ElementStyleOptions = {},
  classList: string[] = [],
): T => {
  classList.forEach((className) => {
    e.classList.add(className)
  })
  Object.entries(styles).forEach(([key, value]) => {
    if (typeof value === 'string') {
      e.style.setProperty(key, value)
    }
  })
  return e
}
