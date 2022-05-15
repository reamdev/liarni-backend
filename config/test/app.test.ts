import { appConfig as AppConfig } from '../app'

describe('App Config Values Test', () => {
  test('App Name Test', () => {
    expect(AppConfig.NAME).toBe('Liarni Backend')
  })

  test('App Port Test', () => {
    expect(AppConfig.PORT).toBe(8000)
  })

  test('App JWT Key Test', () => {
    expect(AppConfig.JWT_SECRET).toBeDefined()
  })
})
