import { firstCharacterUppercase } from '../string.utils'

describe('String Utils Test', () => {
  test('Convert First Character in Uppercase Test 1', () => {
    expect(firstCharacterUppercase('elias')).toBe('Elias')
  })

  test('Convert First Character in Uppercase Test 2', () => {
    expect(firstCharacterUppercase('rafael elias')).toBe('Rafael Elias')
  })
})
