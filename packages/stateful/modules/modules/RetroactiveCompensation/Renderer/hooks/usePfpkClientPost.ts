import { usePfpkClient } from '../../../../../hooks'
import { API_BASE, SIGNATURE_TYPE } from '../constants'

export const usePfpkClientPost = () =>
  usePfpkClient({
    apiUrl: API_BASE,
    defaultSignatureType: SIGNATURE_TYPE,
  }).pfpkClient.signAndSend
