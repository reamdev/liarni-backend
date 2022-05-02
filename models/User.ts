import { dbConnection } from '../db'

const userSchema = new dbConnection.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	birthDate: Date,
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	banner: String,
	biografia: String,
	ubicacion: String,
	sitioWeb: String
}, {
	timestamps: true
})

/** Modelo del Usuario de la base de datos de MongoDB */
export default dbConnection.model('User', userSchema)
