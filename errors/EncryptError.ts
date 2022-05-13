/** Error that comes out when there is a failure when encrypting the passed value */
class EncryptError extends Error {
  constructor () {
    super('Error encrypting string')
    this.name = 'EncryptError'
  }
}

export default EncryptError
