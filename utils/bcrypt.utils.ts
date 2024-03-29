import bycrypt from 'bcrypt'
import { EncryptError } from '../errors'
import { validateIfNotEmpty } from './validations.utils'

export const encryptString = (value: string): string => {
  try {
    return bycrypt.hashSync(value, 10)
  } catch (err) {
    throw new EncryptError()
  }
}

export const validateEncrypt = (value: string, encrypted: string): boolean => {
  if (!validateIfNotEmpty(value) || !validateIfNotEmpty(encrypted)) return false

  return bycrypt.compareSync(value, encrypted)
}
