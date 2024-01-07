/**
 * Assert truthy-ness
 * @param expr Input
 * @param msg  Error message
 * @returns    Input
 */
export const assert = <T>(expr: T, msg: string): NonNullable<T> => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!expr) {
    throw new Error(msg)
  }
  return expr
}

/**
 * Assert element exists
 * @param selector CSS selector
 * @param msg      Error message
 * @returns        Element
 */
export const assertElement = <T extends Element = HTMLElement>(
  selector: string,
  msg?: string,
): T => {
  const e = document.querySelector<T>(selector)
  if (e instanceof Element) {
    return e
  }
  throw new Error(msg ?? `Assertion Failed! unable to find element at "${selector}"!`)
}
