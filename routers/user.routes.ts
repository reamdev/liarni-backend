/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Router } from 'express'
import { ValidateError } from '../errors'
import { validateToken } from '../middlewares'
import { UserModel } from '../models'

const router = Router()

router.use(validateToken)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res) => {
  try {
    const searchValue = String(req.query.searchValue)

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    let users: any[]

    if (searchValue[0] === '@') {
      const userNameSearch = searchValue.slice(1)

      users = await UserModel.find({ userName: { $regex: '.*' + userNameSearch + '.*', $options: 'i' } })
    } else {
      users = await UserModel.find({ $or: [{ name: { $regex: '.*' + searchValue + '.*', $options: 'i' } }, { lastName: { $regex: '.*' + searchValue + '.*', $options: 'i' } }, { userName: { $regex: '.*' + searchValue + '.*', $options: 'i' } }] })
    }

    for (let index = 0; index < users.length; index++) {
      users[index].password = ''
    }

    return res.status(200).json({ message: 'Usuario o usuarios encontrados', users: users })
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

/** Contains user paths */
export default router
