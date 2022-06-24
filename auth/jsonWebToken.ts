import jwt from 'jsonwebtoken'
import { appConfig } from '../config'
import JWTError from '../errors/JWTError'

export const createToken = (id: string): string => {
  try {
    return jwt.sign({ id: id }, appConfig.JWT_SECRET, { expiresIn: '1w' })
  } catch (error) {
    throw new JWTError('Error al crear el token')
  }
}

export const validateJWT = (token: string): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jwt.verify(token, appConfig.JWT_SECRET, (err, _) => {
      if (err != null) throw new JWTError('Token Invalido')
    })
    return true
  } catch (err) {
    return false
  }
}

export const getUserIdByToken = (token: string): string => {
  const decoded = token.startsWith('Bearer ') ? jwt.decode(token.split(' ')[1], { complete: true }) : jwt.decode(token, { complete: true })

  return (decoded != null) ? Object.values(decoded.payload)[0] : ''
}
