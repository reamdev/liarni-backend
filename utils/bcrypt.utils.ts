import bycrypt from 'bcrypt'
import { EncryptError } from '../errors'

export const encryptString = (value: string): string => {
  try {
    const salt = bycrypt.genSaltSync(10)
    return bycrypt.hashSync(value, salt)
  } catch (err) {
    throw new EncryptError()
  }
}

export const validateEncrypt = (value: string, encrypted: string): boolean => {
  if (!value || !encrypted) return false

  return bycrypt.compareSync(value, encrypted)
}
