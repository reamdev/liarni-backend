import { Router } from 'express'
import { getUserIdByToken } from '../auth/jsonWebToken'
import { TweetError, ValidateError } from '../errors'
import { validateToken } from '../middlewares'
import { TweetModel } from '../models'
import { firstCharacterUppercase, validateIfNotEmpty } from '../utils'

const router = Router()

// Token Middleware
router.use(validateToken)

/* Agregar un Tweet */
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res) => {
  try {
    const newTweet = new TweetModel(req.body)

    if (!validateIfNotEmpty(newTweet.message) || newTweet.message.length < 3) throw new ValidateError('message')

    newTweet.userId = getUserIdByToken(String(req.headers.authorization))
    if (!validateIfNotEmpty(newTweet._id) || newTweet._id.length < 5) throw new ValidateError('Token con datos invalidos')

    await newTweet.save()

    return res.status(201).json({ message: 'Tweet registrado!' })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let message = `Error: ${error}`
    let status = 500

    if (error instanceof ValidateError) {
      message = firstCharacterUppercase(`${error.getParameter()} no válido`)
      status = 400
    }

    return res.status(status).json({ message: message })
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/getTweetByUserId', async (req, res) => {
  const otherPersonId = validateIfNotEmpty(req.query.idPerson) ? String(req.query.idPerson) : ''
  const yourId = getUserIdByToken(String(req.headers.authorization))

  try {
    let tweets: any[]

    if (otherPersonId === '') {
      tweets = await TweetModel.find({ userId: yourId }).sort({ date: -1 })
    } else {
      tweets = await TweetModel.find({ userId: otherPersonId }).sort({ date: -1 })
    }

    return res.status(200).json({ tweets: tweets })
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_, res) => {
  try {
    const tweets: any[] = await TweetModel.find().sort({ date: -1 })

    return res.status(200).json({ tweets: tweets })
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/', async (req, res) => {
  try {
    const tweetId = String(req.query.id)
    const userId = getUserIdByToken(String(req.headers.authorization))

    const tweet = await TweetModel.findOne({ _id: tweetId })

    if (validateIfNotEmpty(tweet)) {
      if (String(tweet.userId) === userId) {
        await TweetModel.deleteOne({ _id: tweetId })
        return res.status(200).json({ message: 'Tweet eliminado correctamente' })
      } else {
        throw new TweetError('No esta autorizado para eliminar este tweet', 401)
      }
    } else {
      throw new TweetError('Tweet no encontrado', 400)
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
      message = 'Identificador de tweet invalido'
      status = 409
    }

    return res.status(status).json({ message: message })
  }
})

/** Contains the tweet paths */
export default router
