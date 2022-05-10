import { Router } from 'express'
import { ValidateError } from '../errors'
import { validateToken } from '../middlewares'
import { UserModel } from '../models'

const router = Router()

router.use(validateToken)

router.get('/', async (req, res)=>{
  try {
    const { name } = req.query

    const users = await UserModel.find({$or: [{name:{ $regex: '.*' + name + '.*', $options: 'i' }}, {lastName:{ $regex: '.*' + name + '.*', $options: 'i' }}]})

    for (let index = 0; index < users.length; index++) {
      users[index].password = ''
    }

    return res.status(200).json({ message: 'Usuario o usuarios encontrados', users: users })
  } catch (error) {
    let message = `Error: ${error}`
    let status = 500

    if (error instanceof ValidateError) {
      message = error.getParameter()
      status = 400
    }

    return res.status(status).json({ message: message })
  }
})

/**Contains user paths */
export default router
