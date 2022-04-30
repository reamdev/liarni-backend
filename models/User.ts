import { dbConnection } from '../db'

const userSchema = new dbConnection.Schema({
	name: String,
	lastName: String,
	birthDate: Date,
	email: String,
	password: String,
	avatar: String,
	banner: String,
	biografia: String,
	ubicacion: String,
	sitioWeb: String
})

/** Modelo del Usuario de la base de datos de MongoDB */
export default dbConnection.model('User', userSchema)
