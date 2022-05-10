import { NextFunction, Request, Response } from 'express'
import { validateJWT } from '../auth/jsonWebToken'
import JWTError from '../errors/JWTError'
import { validateIfNotEmpty } from '../utils'

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = String(req.headers.authorization).split(' ')[1]

    if (!validateIfNotEmpty(token)) throw new JWTError('Token no encontrado')

    if(validateJWT(token)) {
      next()
    } else {
      throw new JWTError('Token Invalido')
    }
  } catch(error) {
    if(error instanceof JWTError) {
      res.status(401).json({ message: error.message })
    }
  }
}

export default validateToken
