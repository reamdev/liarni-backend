/** Function to put the first character of a string in uppercase */
export const firstCharacterUppercase = (value: string): string => {
  const arr = value.split(' ')
  let stringConverted = ''

  for (let i = 0; i < arr.length; i++) {
    stringConverted += `${arr[i][0].toUpperCase() + arr[i].slice(1)}`

    if (i < arr.length - 1) stringConverted += ' '
  }

  return stringConverted
}
