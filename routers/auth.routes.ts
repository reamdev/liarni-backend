import express from 'express'
import { createToken } from '../auth'
import { EncryptError, ValidateError } from '../errors'
import { UserModel } from '../models'
import { firstCharacterUppercase, validateEmail, encryptString } from '../utils'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel(req.body)

    if (!newUser.name || newUser.name.length < 3) throw new ValidateError('nombre')
    if (!newUser.lastName || newUser.lastName.length < 3) throw new ValidateError('apellido')
    if (!newUser.email || !validateEmail(newUser.email)) throw new ValidateError('correo')
    if (!newUser.password || newUser.password.length < 3) throw new ValidateError('contraseña')

    newUser.password = encryptString(newUser.password)

    await newUser.save()
    const token = createToken(newUser.email)

    return res.status(201).json({ message: 'Cuenta registrada!', token: token })
  } catch (error) {
    let message = `Error: ${error}`
    let status = 500

    if (String(error).includes('duplicate key error collection')) {
      message = 'La dirección de correo ya esta registrada'
      status = 400
    }

    if (error instanceof ValidateError) {
      message = firstCharacterUppercase(`${error.getParameter()} no válido`)
      status = 400
    }

    if(error instanceof EncryptError) message = error.message

    return res.status(status).json({ message: message })
  }
})

/**Contains user registration and authentication paths */
export default router
