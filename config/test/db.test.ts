import dbConfig from '../db'

describe('DB Config Values Test', () => {
  test('MongoDB Instance Test', () => {
    expect(dbConfig.INSTANCE).toBe('atlas')
  })

  test('MongoDB Name Test', () => {
    expect(dbConfig.DBNAME).toBe('liarni')
  })
})
