import { Router } from 'express'
import { getUserIdByToken } from '../auth/jsonWebToken'
import { ValidateError } from '../errors'
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

    newTweet.userId = getUserIdByToken(String(req.headers.authorization).split(' ')[1])
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
router.get('/yourOrOtherPersonTweets/', async (req, res) => {
  const otherPersonId = String(req.query.idPerson)
  const yourId = getUserIdByToken(String(req.headers.authorization).split(' ')[1])

  try {
    let tweets: any[]

    if (otherPersonId === '') {
      tweets = await TweetModel.find({ userId: yourId }).sort({ date: -1 })
    } else {
      tweets = await TweetModel.find({ userId: otherPersonId }).sort({ date: -1 })
    }

    return res.status(200).json({ message: 'Tweet o Tweets encontrados', tweets: tweets })
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
router.get('/allTweets/', async (req, res) => {
  const userId = getUserIdByToken(String(req.headers.authorization).split(' ')[1])
  console.log(userId)

  try {
    const tweets: any[] = await TweetModel.find().sort({ date: -1 })

    return res.status(200).json({ message: 'Tweet o Tweets encontrados', tweets: tweets })
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
router.get('/deleteTweet/', async (req, res) => {
  try {
    const TweetId = String(req.query.id)
    const resultado = await TweetModel.findByIdAndDelete(TweetId)
    console.log(resultado)
    return res.status(200).json({ message: 'Tweet eliminado correctamente' })
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

/** Contains the tweet paths */
export default router
