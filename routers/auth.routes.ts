import express from 'express'
import User from '../models/User'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body)

    if(!newUser.name || newUser.name.length < 3) res.status(400).json({message: 'El nombre no es válido'})
    if(!newUser.lastName || newUser.lastName.length < 3) res.status(400).json({message: 'El Apellido no es válido'})
    if(!newUser.email || newUser.email.length < 3) res.status(400).json({message: 'El Correo no es válido'})
    if(!newUser.password || newUser.password.length < 3) res.status(400).json({message: 'La Contraseña no es válido'})

    await newUser.save()

    res.status(201).json({message: 'register'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Error: ' + error})
  }
})

export default router
