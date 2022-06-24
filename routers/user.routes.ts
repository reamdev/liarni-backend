/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Router } from 'express'
import { ValidateError } from '../errors'
import { validateToken } from '../middlewares'
import { UserModel, RelationModel } from '../models'
import { validateIfNotEmpty } from '../utils'
import { getUserIdByToken } from '../auth/jsonWebToken'

const router = Router()

router.use(validateToken)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res) => {
  try {
    const searchValue = validateIfNotEmpty(req.query.searchValue) ? String(req.query.searchValue) : ''

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

// obtener una lista de usuarios que sigues o no dependiendo si pones el nombre de la persona o nada en la barra de busqueda
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/SearchFollowOrNewUser', async (req, res) => {
  try {
    let users: any[]
    const usersList: any[] = []
    let incluir: boolean
    const userId = getUserIdByToken(String(req.headers.authorization))
    const searchValue = validateIfNotEmpty(req.query.searchValue) ? String(req.query.searchValue) : ''
    const type = validateIfNotEmpty(req.query.type) ? String(req.query.type) : ''

    if (searchValue[0] === '@') {
      const userNameSearch = searchValue.slice(1)
      users = await UserModel.find({ userName: { $regex: '.*' + userNameSearch + '.*', $options: 'i' } })
    } else {
      users = await UserModel.find({ $or: [{ name: { $regex: '.*' + searchValue + '.*', $options: 'i' } }, { lastName: { $regex: '.*' + searchValue + '.*', $options: 'i' } }, { userName: { $regex: '.*' + searchValue + '.*', $options: 'i' } }] })
    }
    for (let index = 0; index < users.length; index++) {
      users[index].password = ''
    }
    for (let index = 0; index < users.length; index++) {
      const userRelationIdString: String = String(users[index]._id)
      incluir = false
      const usersRelation: any = await RelationModel.findOne({ $and: [{ userId: userId }, { userRelationId: userRelationIdString }] })
      users[index].password = ''
      if (usersRelation !== null && type === 'follow') {
        incluir = true
      }
      if (usersRelation === null && type === 'new') {
        incluir = true
      }
      if (users[index].id === userId) {
        incluir = false
      }
      if (incluir) {
        usersList.push(users[index])
      }
      incluir = false
    }
    console.log(usersList)
    return res.status(200).json({ message: 'Usuario o usuarios encontrados', users: usersList })
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
