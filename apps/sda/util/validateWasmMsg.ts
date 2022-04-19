import Ajv from 'ajv'

import schema from './cosmos_msg.json'

const ajv = new Ajv()
const validate = ajv.compile(schema)

export function validateCosmosMsg(msg: any) {
  return {
    valid: validate(msg),
    errors: validate.errors,
  }
}
