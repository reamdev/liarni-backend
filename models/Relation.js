import {dbConnection} from '../db'

const Relation = new dbConnection.Schema({
    userId: String,
    userRelationId: String
})

export default dbConnection.model('Relation',Relation)