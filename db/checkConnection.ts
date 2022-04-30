import { dbConnection } from './connectDB'

const checkConnection = () => {
	try {
		return dbConnection.connection.db.admin().ping()
	} catch (error) {
		console.error('DB connection error', error)
		return {ok: 0}
	}
}

export default checkConnection
