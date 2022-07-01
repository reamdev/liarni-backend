import mongoose from 'mongoose'
import { dbConfig } from '../config'

export let dbConnection: typeof mongoose = mongoose

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connectDB = async () => {
  try {
    let url = ''

    if (dbConfig.INSTANCE === 'local') {
      url = `mongodb://localhost/${dbConfig.DBNAME}`
    } else if (dbConfig.INSTANCE === 'atlas') {
      url = `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.CLUSTER}.${dbConfig.ATLAS_CODE}.mongodb.net/${dbConfig.DBNAME}?retryWrites=true&w=majority`
    }

    dbConnection = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('DB connected to', dbConnection.connection.host)
  } catch (error) {
    console.error('DB connection error', error)
  }
}

export default connectDB
