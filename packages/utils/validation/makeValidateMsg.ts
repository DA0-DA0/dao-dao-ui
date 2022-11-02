import Ajv, { ErrorObject } from 'ajv'
import { TFunction } from 'next-i18next'

export class AjvInvalidMessageError extends Error {
  public errors: ErrorObject<string, Record<string, any>, unknown>[]

  constructor(
    errors: ErrorObject<string, Record<string, any>, unknown>[],
    t?: TFunction
  ) {
    super(
      (t?.('error.invalidMessage') ?? 'Invalid message') +
        ': ' +
        errors
          .map(
            ({ instancePath, message }) =>
              instancePath && message && `${instancePath} ${message}`
          )
          .filter(Boolean)
          .join(', ')
    )
    this.name = 'InvalidMessageError'
    this.errors = errors
  }
}

export const makeValidateMsg = <T>(
  schema: Record<string, any>,
  t?: TFunction
) => {
  const ajv = new Ajv()
  const validate = ajv.compile<T>(schema)

  return (msg: T) => {
    if (!validate(msg)) {
      throw new AjvInvalidMessageError(validate.errors ?? [], t)
    }
  }
}
