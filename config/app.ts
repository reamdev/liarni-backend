import { config } from 'dotenv'
import { validateIfNotEmpty } from '../utils'

// Detect env file
config()

/** Contains app configuration variables */
export const appConfig = {
  PORT: validateIfNotEmpty(process.env.PORT) ? Number(process.env.PORT) : 8080,
  JWT_SECRET: validateIfNotEmpty(process.env.JWT_SECRET) ? String(process.env.JWT_SECRET) : ''
}
