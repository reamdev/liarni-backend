import { config } from 'dotenv'
import { MongoInstance } from '../enums'
import { DataBaseError } from '../errors'
import { MongoAtlasInstance, MongoLocalInstance } from '../types'
import { validateIfNotEmpty } from '../utils'

// Detect env file
config()

let dbConfig: MongoLocalInstance | MongoAtlasInstance = { INSTANCE: 'local', DBNAME: '' }
const envInstance = validateIfNotEmpty(process.env.MONGO_DB_INSTANCE) ? String(process.env.MONGO_DB_INSTANCE) : ''

if (MongoInstance.LOCAL === envInstance) {
  dbConfig = {
    INSTANCE: 'local',
    DBNAME: validateIfNotEmpty(process.env.MONGO_DB_DBNAME) ? String(process.env.MONGO_DB_DBNAME) : ''
  }
} else if (MongoInstance.ATLAS === envInstance) {
  dbConfig = {
    INSTANCE: 'atlas',
    USER: validateIfNotEmpty(process.env.MONGO_DB_USER) ? String(process.env.MONGO_DB_USER) : '',
    PASSWORD: validateIfNotEmpty(process.env.MONGO_DB_PASSWORD) ? String(process.env.MONGO_DB_PASSWORD) : '',
    CLUSTER: validateIfNotEmpty(process.env.MONGO_DB_CLUSTER) ? String(process.env.MONGO_DB_CLUSTER) : '',
    DBNAME: validateIfNotEmpty(process.env.MONGO_DB_DBNAME) ? String(process.env.MONGO_DB_DBNAME) : '',
    ATLAS_CODE: validateIfNotEmpty(process.env.MONGO_DB_ATLAS_CODE) ? String(process.env.MONGO_DB_ATLAS_CODE) : ''
  }
} else throw new DataBaseError('Invalid instance. An instance with value local or atlas is needed')

export default dbConfig
