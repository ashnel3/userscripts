import { expect, describe, test } from 'vitest'
import { createElement, styleElement } from '../util/element'

describe('element', () => {
  test('createElement should create children', () => {
    const a = createElement('a', {
      children: [
        {
          tagName: 'b',
          children: [{ tagName: 'i' }],
        },
      ],
    })
    expect(a.querySelector('b > i')).toBeInstanceOf(Element)
  })

  test('createElement should set innerText correctly', () => {
    const a = createElement('a', {
      children: [
        {
          tagName: 'b',
          innerText: 'test2',
        },
      ],
      innerText: 'test1',
    })
    expect(a.innerHTML).toBe(`test1<b>test2</b>`)
  })

  test('styleElement should set styles', () => {
    const a = styleElement(document.createElement('a'), { width: '12px' })
    expect(a.style.width).toBe('12px')
  })

  test('styleElement should set classNames', () => {
    const a = styleElement(document.createElement('a'), {}, ['test'])
    expect(a.classList.contains('test')).toBe(true)
  })
})
