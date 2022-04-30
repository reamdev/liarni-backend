import mongoose from 'mongoose'
import { dbConfig } from '../config'

export let dbConnection: typeof mongoose

const connectDB = async () => {
	try {
		dbConnection = await mongoose.connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.CLUSTER}.5lwr5.mongodb.net/${dbConfig.DBNAME}?retryWrites=true&w=majority`, {
			serverSelectionTimeoutMS: 5000
		})
		console.log('DB connected to ', dbConnection.connection.host)
	} catch (error) {
		console.error('DB connection error', error)
	}
}

export default connectDB
