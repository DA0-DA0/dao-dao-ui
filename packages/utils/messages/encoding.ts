import { fromBase64, fromUtf8, toBase64, toUtf8 } from '@cosmjs/encoding'

/**
 * Encode JSON object as base64 string.
 */
export const encodeJsonToBase64 = (object: any) =>
  toBase64(toUtf8(JSON.stringify(object)))

/**
 * Decode base64 string into JSON object.
 */
export const decodeJsonFromBase64 = (base64String?: string) => {
  if (base64String) {
    const jsonMessage = fromUtf8(fromBase64(base64String))
    if (jsonMessage) {
      return JSON.parse(jsonMessage)
    }
  }
}
