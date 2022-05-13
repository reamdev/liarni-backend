import { dbConnection } from './connectDB'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const checkConnection = () => {
  try {
    return dbConnection.connection.db.admin().ping()
  } catch (error) {
    console.error('DB connection error', error)
    return { ok: 0 }
  }
}

export default checkConnection
