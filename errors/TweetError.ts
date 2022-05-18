import { ErrorStatusCode400 } from '../types'

/** Error that comes out when there was a problem related to the tweets */
class TweetError extends Error {
  private readonly status: ErrorStatusCode400

  constructor (mensage: string, status: ErrorStatusCode400 = 400) {
    super('Tweet Error')
    this.name = 'TweetError'
    this.message = mensage
    this.status = status
  }

  public getStatus (): ErrorStatusCode400 {
    return this.status
  }
}

export default TweetError
