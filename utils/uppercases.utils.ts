/**Function to put the first character of a string in uppercase */
export const firstCharacterUppercase = (value: string) => {
  return value ? value[0].toUpperCase() + value.slice(1) : ''
}
