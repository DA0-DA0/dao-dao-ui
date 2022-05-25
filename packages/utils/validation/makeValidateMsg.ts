import Ajv, { ErrorObject } from 'ajv'

export class InstantiateValidationError extends Error {
  constructor(
    public errors: ErrorObject<string, Record<string, any>, unknown>[]
  ) {
    super('Invalid instantiation message.')
    this.name = 'InstantiateValidationError'
  }
}

export const makeValidateMsg = <T>(schema: Record<string, any>) => {
  const ajv = new Ajv()
  const validate = ajv.compile<T>(schema)

  return (msg: T) => {
    if (!validate(msg)) {
      throw new InstantiateValidationError(validate.errors ?? [])
    }
  }
}
