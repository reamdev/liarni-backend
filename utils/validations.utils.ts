/** Receives a parameter of any type and checks if it is not null or undefined if it is not returns true if it is null returns false */
export const validateIfNotEmpty = (value: any): boolean => {
  return (value !== null && value !== undefined)
}

/** Function to validate if an email is valid */
export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line prefer-regex-literals, no-useless-escape
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
  return regex.test(email)
}
