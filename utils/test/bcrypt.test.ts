import { encryptString, validateEncrypt } from '../bcrypt.utils'

// const encrypted = '$2b$10$oYr7tuNaf.S7t9eZ3TYO1OYQGpUr5MSwn6payhmfaeDBF2sAyursG'
const encrypted = '$2b$10$T/RdglZ8ZTji8V5Ap3WJyu4qBdQNKnIVfRyIBAJSQcMlnXJ/3PVOu'
const encrypted2 = '$2b$10$e7bJVUJdM52tT0nphHWLyutVo8Ep8h3qtytSVBZcKmfupJ4ao6vwe'

describe('Bcrypt Utils Test', () => {
  test('Encrypting String Test', () => {
    expect(encryptString('12345678')).toBeDefined()
  })

  test('Validate Encrypt Test', () => {
    expect(validateEncrypt('12345678', encrypted)).toBe(true)
  })

  test('Second Validate Encrypt Test', () => {
    expect(validateEncrypt('12345678', encrypted2)).toBe(true)
  })
})
