/** Object with validation functions */
const validations = {
  /** Receives a parameter of any type and checks if it is not null or undefined if it is not returns true if it is null returns false */
  validateIfNotEmpty: (value: any): boolean => {
    return (value !== null || value !== undefined)
  }
}

export default validations
