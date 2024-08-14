/**
 * assert truthy-ness
 * @param expr input expression
 * @param msg  error message
 * @returns    input
 */
export const assert = <T>(expr: T, msg?: string): NonNullable<T> => {
  if (!expr) {
    throw new Error(msg)
  }
  return expr
}

/**
 * assert query selector
 * @param selector css selector
 * @param msg      error message
 * @returns        html element
 */
export const assertQuery = <E extends Element = Element>(selector: string, msg?: string): E => {
  return assert(document.querySelector<E>(selector), msg)
}

export default assert
