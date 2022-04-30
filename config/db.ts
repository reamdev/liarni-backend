import { config } from 'dotenv'
import { validateIfNotEmpty } from '../utils'

// Detect env file
config()

export const dbConfig = {
  USER: validateIfNotEmpty(process.env.MONGO_DB_USER) ? String(process.env.MONGO_DB_USER) : '',
  PASSWORD: validateIfNotEmpty(process.env.MONGO_DB_PASSWORD) ? String(process.env.MONGO_DB_PASSWORD) : '',
  CLUSTER: validateIfNotEmpty(process.env.MONGO_DB_CLUSTER) ? String(process.env.MONGO_DB_CLUSTER) : '',
  DBNAME: validateIfNotEmpty(process.env.MONGO_DB_DBNAME) ? String(process.env.MONGO_DB_DBNAME) : ''
}
