import { validateEmail, validateIfNotEmpty } from '../validations.utils'

describe('Validations Test', () => {
  test('Valid Email Test', () => {
    expect(validateEmail('ream_tp@outlook.com')).toBe(true)
  })

  test('Invalid Email Test', () => {
    expect(validateEmail('elias.com')).toBe(false)
  })

  test('Is not empty Test', () => {
    const value = 'elias'
    expect(validateIfNotEmpty(value)).toBe(true)
  })

  test('Is null Test', () => {
    const value = null
    expect(validateIfNotEmpty(value)).toBe(false)
  })

  test('Is undefined Test', () => {
    const value = undefined
    expect(validateIfNotEmpty(value)).toBe(false)
  })
})
