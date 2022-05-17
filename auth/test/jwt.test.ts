import { getUserIdByToken, validateJWT } from '../jsonWebToken'

describe('JWT Test', () => {
  test('Validate JWT', () => {
    expect(validateJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2RmMzZiZWEzOWI4NWI1YjBhZDNjZCIsImlhdCI6MTY1MjQ1NzAwMCwiZXhwIjoxODEwMjQ1MDAwfQ.WF1dGXyzYeBUMc4Vn5A1N3QziBP5BiucqceC8H0lrhA')).toBe(true)
  })

  test('Get User Id By Token Test', () => {
    expect(getUserIdByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2RmMzZiZWEzOWI4NWI1YjBhZDNjZCIsImlhdCI6MTY1MjQ1NzAwMCwiZXhwIjoxODEwMjQ1MDAwfQ.WF1dGXyzYeBUMc4Vn5A1N3QziBP5BiucqceC8H0lrhA')).toBe('627df36bea39b85b5b0ad3cd')
  })
})
