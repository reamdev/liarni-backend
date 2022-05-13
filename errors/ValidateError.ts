/** Error that comes out when the validation of a parameter is not fulfilled */
class ValidateError extends Error {
  private readonly parameter: string

  constructor (parameter: string) {
    super(`Error validating ${parameter}`)
    this.name = 'ValidateError'
    this.parameter = parameter
  }

  getParameter (): string {
    return this.parameter
  }
}

export default ValidateError
