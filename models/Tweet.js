import { dbConnection } from '../db'

const tweetSchema = new dbConnection.Schema({
    userId: {
        type: dbConnection.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

export default dbConnection.model('Tweet', tweetSchema)