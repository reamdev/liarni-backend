import express from 'express'
import morgan from 'morgan'
import { appConfig } from './config'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json()) // For transform req.body to json
app.use(express.urlencoded({ extended: true })) // To parse incoming url-encoded requests

// Init Server
app.listen(appConfig.PORT, () => {
  console.log(`Server is listening on port ${appConfig.PORT}`)
})
