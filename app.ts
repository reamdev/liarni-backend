import express from 'express'
import morgan from 'morgan'
import { connectDB } from './db'
import { appConfig } from './config'
import { checkDBConnection } from './middlewares'
import { AuthRouter, TweetRouter, UserRouter } from './routers'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json()) // For transform req.body to json
app.use(express.urlencoded({ extended: true })) // To parse incoming url-encoded requests

// Own Middleware
app.use(checkDBConnection)

// Database Connection
void connectDB()

// Routes
app.use('/', express.Router().get('', (_, res) => res.status(200).json({ message: 'Welcome to the API' })))
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/tweet', TweetRouter)

// Init Server
app.listen(appConfig.PORT, () => {
  console.log(`Server is listening on port ${appConfig.PORT}`)
})
