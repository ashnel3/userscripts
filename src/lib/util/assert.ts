export interface AssertQuerySelector {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    msg?: string,
    root?: Document | Element,
  ): HTMLElementTagNameMap[K]
  <E extends Element = Element>(selectors: string, msg?: string, root?: Document | Element): E
}

export class AssertionError extends Error {
  readonly type: string

  constructor(msg?: string, type = 'unknown') {
    super(msg)
    this.type = type
  }
}

export const truthy = <T>(value: T, msg?: string): NonNullable<T> => {
  if (!value) {
    throw new AssertionError('truthy', msg)
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
    throw new AssertionError('query', msg)
  }
  return element
}

export const querySelectorAll = () => new Error('assert.querySelectorAll unimplemented!')
