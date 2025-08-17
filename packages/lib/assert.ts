export interface AssertQuerySelector {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    msg?: string,
    root?: Document | Element,
  ): HTMLElementTagNameMap[K] extends Element ? HTMLElementTagNameMap[K] : Element
  <E extends Element = Element>(selectors: string, msg?: string, root?: Document | Element): E
}

export const truthy = <T>(value: T, msg?: string): NonNullable<T> => {
  if (!value) {
    throw new Error(msg)
  }
  return value
}

export const querySelector: AssertQuerySelector = (
  selectors: string,
  msg?: string,
  root: Document | Element = document,
) => {
  const element = root.querySelector(selectors)
  if (element === null) {
    throw new Error(msg)
  }
  return element
}

export const querySelectorAll = () => new Error('assert.querySelectorAll unimplemented!')
