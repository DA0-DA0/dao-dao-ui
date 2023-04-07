import { fromBase64, fromUtf8, toBase64, toUtf8 } from '@cosmjs/encoding'

export function parseEncodedMessage(base64String?: string) {
  if (base64String) {
    const jsonMessage = fromUtf8(fromBase64(base64String))
    if (jsonMessage) {
      return JSON.parse(jsonMessage)
    }
  }
  return undefined
}

export const encodeMessageAsBase64 = (message: any) =>
  toBase64(toUtf8(JSON.stringify(message)))
