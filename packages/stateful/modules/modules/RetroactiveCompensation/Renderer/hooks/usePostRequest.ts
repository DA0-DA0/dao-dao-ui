import { usePfpkAuthenticatedFetch } from '../../../../../hooks'
import { API_BASE, SIGNATURE_TYPE } from '../constants'

export const usePostRequest = () =>
  usePfpkAuthenticatedFetch({
    apiUrl: API_BASE,
    defaultSignatureType: SIGNATURE_TYPE,
  }).postRequest
