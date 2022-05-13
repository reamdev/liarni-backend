/** Function to put the first character of a string in uppercase */
export const firstCharacterUppercase = (value: string): string => {
  return value.length > 0 ? value[0].toUpperCase() + value.slice(1) : ''
}
