import { dbConnection } from '../db'

const relationSchema = new dbConnection.Schema({
  userId: {
    type: dbConnection.Schema.Types.ObjectId,
    required: true
  },
  userRelationId: {
    type: dbConnection.Schema.Types.ObjectId,
    required: true
  }
})

export default dbConnection.model('Relation', relationSchema)
