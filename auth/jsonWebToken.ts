import jwt from 'jsonwebtoken'
import { appConfig } from '../config'
import JWTError from '../errors/JWTError'

export const createToken = (email: string): string => {
  try {
    return jwt.sign({ email: email }, appConfig.JWT_SECRET, { expiresIn: '1d' })
  } catch (error) {
    throw new JWTError('Error al crear el token')
  }
}

export const validateJWT = (token: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jwt.verify(token, appConfig.JWT_SECRET, (err, _) => {
    if (err) throw new JWTError('Token Invalido')

    return true
  })

  return false
}