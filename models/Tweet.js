import {dbConnection} from '../db'

const tweetSchema = new dbConnection.Schema({
    userId: String,
    message: String,
    date: Date
})

export default dbConnection.model('Tweet',tweetSchema)