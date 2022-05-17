import { Router } from 'express'
import { createToken } from '../auth'
import { EncryptError, ValidateError } from '../errors'
import { UserModel } from '../models'
import { firstCharacterUppercase, validateEmail, encryptString, validateEncrypt, validateIfNotEmpty } from '../utils'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel(req.body)

    if (!validateIfNotEmpty(newUser.userName) || newUser.userName.length < 4) throw new ValidateError('user name')
    if (!validateIfNotEmpty(newUser.name) || newUser.name.length < 3) throw new ValidateError('nombre')
    if (!validateIfNotEmpty(newUser.lastName) || newUser.lastName.length < 3) throw new ValidateError('apellido')
    if (!validateIfNotEmpty(newUser.email) || !validateEmail(newUser.email)) throw new ValidateError('correo')
    if (!validateIfNotEmpty(newUser.password) || newUser.password.length < 8) throw new ValidateError('contraseña')

    newUser.password = encryptString(newUser.password)

    await newUser.save()
    const token = createToken(newUser._id)

    return res.status(201).json({ message: 'Cuenta registrada!', token: token })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

    if (error instanceof EncryptError) message = error.message

    return res.status(status).json({ message: message })
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!validateIfNotEmpty(email) || !validateEmail(email)) throw new ValidateError('El correo no es valido')
    if (password.length < 8) throw new ValidateError('La contraseña debe tener 8 caracteres')

    const user = await UserModel.findOne({ email: email })

    if (!validateIfNotEmpty(user)) throw new ValidateError('No existe un usuario registrado con el correo indicado')
    if (!validateIfNotEmpty(user.password) || !validateEncrypt(password, user.password)) throw new ValidateError('La contraseña es incorrecta')

    const token = createToken(user._id)

    return res.status(200).json({ message: 'Inicio de sesión exitoso!', token: token })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let message = `Error: ${error}`
    let status = 500

    if (error instanceof ValidateError) {
      message = error.getParameter()
      status = 400
    }

    return res.status(status).json({ message: message })
  }
})

/** Contains user registration and authentication paths */
export default router
