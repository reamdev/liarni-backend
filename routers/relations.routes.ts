import { Router } from 'express'
import { getUserIdByToken } from '../auth/jsonWebToken'
import { TweetError } from '../errors'
import { validateToken } from '../middlewares'
import { RelationModel } from '../models'
import { validateIfNotEmpty } from '../utils'

const router = Router()

// Token Middleware
router.use(validateToken)

// Creando una nueva relacion
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res) => {
  const newRelation = new RelationModel()

  try {
    const userRelationId = String(req.query.id)
    const userId = getUserIdByToken(String(req.headers.authorization))

    if (validateIfNotEmpty(userRelationId)) {
      newRelation.userId = String(userId)
      newRelation.userRelationId = String(userRelationId)
      await newRelation.save()
      return res.status(200).json({ message: 'Ahora sigues a esa persona' })
    } else {
      throw new TweetError('Usuario no encontrado', 400)
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let message = String(error)
    let status = 500

    if (error instanceof TweetError) {
      message = error.message
      status = error.getStatus()
    }

    if (message.startsWith('CastError: ')) {
      message = 'Ocurrio un error al seguir a la persona'
      status = 409
    }

    return res.status(status).json({ message: message })
  }
})

// Dejar de seguir a una persona
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/', async (req, res) => {
  try {
    const userRelationId = String(req.query.id)
    const userId = getUserIdByToken(String(req.headers.authorization))
    const deleteRelation: any = await RelationModel.findOne({ $and: [{ userId: userId }, { userRelationId: userRelationId }] })
    console.log(deleteRelation._id)
    if (validateIfNotEmpty(userRelationId)) {
      await RelationModel.deleteOne({ _id: deleteRelation._id })
      return res.status(200).json({ message: 'Ahora dejaste de siguir a esa persona' })
    } else {
      throw new TweetError('Ocurrio un al dejar de seguir al usuario', 400)
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let message = String(error)
    let status = 500

    if (error instanceof TweetError) {
      message = error.message
      status = error.getStatus()
    }

    if (message.startsWith('CastError: ')) {
      message = 'Ocurrio un error al dejar de seguir al usuario'
      status = 409
    }

    return res.status(status).json({ message: message })
  }
})

export default router
