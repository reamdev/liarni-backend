/** Error that comes out when there is a failure the database */
class DataBaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'DataBaseError'
  }
}

export default DataBaseError
