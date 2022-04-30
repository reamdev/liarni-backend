import { config } from 'dotenv'
import { validations } from '../utils'

// Detect env file
config()

// Get Empty Validator
const notEmptyValidator = validations.validateIfNotEmpty

/** Contains app configuration variables */
export const appConfig = {
  PORT: notEmptyValidator(process.env.PORT) ? Number(process.env.PORT) : 8080
}
