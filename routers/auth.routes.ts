import express from 'express'
import { createToken } from '../auth'
import { EncryptError, ValidateError } from '../errors'
import { UserModel } from '../models'
import { firstCharacterUppercase, validateEmail, encryptString, validateEncrypt } from '../utils'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel(req.body)

    if (!newUser.name || newUser.name.length < 3) throw new ValidateError('nombre')
    if (!newUser.lastName || newUser.lastName.length < 3) throw new ValidateError('apellido')
    if (!newUser.email || !validateEmail(newUser.email)) throw new ValidateError('correo')
    if (!newUser.password || newUser.password.length < 8) throw new ValidateError('contraseña')

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !validateEmail(email)) throw new ValidateError('El correo no es valido')
    if (password.length < 8) throw new ValidateError('La contraseña debe tener 8 caracteres')

    const user = await UserModel.findOne({ email: email })

    if (!user) throw new ValidateError('No existe un usuario registrado con el correo indicado')
    if (!user.password || !validateEncrypt(password, user.password)) throw new ValidateError('La contraseña es incorrecta')

    const token = createToken(user.email)

    return res.status(200).json({ message: 'Inicio de sesión exitoso!', token: token })
  } catch (error) {
    let message = `Error: ${error}`
    let status = 500

    if (error instanceof ValidateError) {
      message = firstCharacterUppercase(error.getParameter())
      status = 400
    }

    return res.status(status).json({ message: message })
  }
})

router.post('/buscarPerfil', async (req, res)=>{
  try {
    const { name } = req.body

    if(!name) throw new ValidateError('Tiene que ingresar un nombre')
    
    const users = await UserModel.find({name:{ $regex: '.*' + name + '.*', $options: 'i' }})

    for (let index = 0; index < users.length; index++) {
      users[index].password = ''
    }

    return res.status(200).json({ message: 'Usuario o usuarios encontrados', users: users })
    
  } catch (error) {

    let message = `Error: ${error}`
    let status = 500

    if (error instanceof ValidateError) {
      message = firstCharacterUppercase(error.getParameter())
      status = 400
    }

    return res.status(status).json({ message: message })

  }
})

/**Contains user registration and authentication paths */
export default router
