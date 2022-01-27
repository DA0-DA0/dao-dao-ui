import { isValidAddress } from './isValidAddress'

export const validateRequired = (v: string) =>
  v.length > 0 || 'Field is required'

export const validatePositive = (v: string) =>
  parseInt(v) > 0 || 'Must be positive'

export const validateNonNegative = (v: string) =>
  parseInt(v) >= 0 || 'Must be non-negative'

export const validatePercent = (v: string) => {
  const p = Number(v)
  return (p <= 100 && p >= 0) || 'Invalid percentage'
}

export const validateAddress = (v: string) =>
  isValidAddress(v) || 'Invalid address'

export const validateUrl = async (v: string) => {
  const regex = /(https:)|([/|.|\w|\s])*\.(?:jpg|gif|png)/

  if (!regex.test(v)) {
    return 'Invalid URL link, must start with https and end with png/jpeg/gif.'
  } else {
    let isImg = await checkImage(v)
    return isImg || 'Invalid Img Url provided, not actual image'
  }
}

async function checkImage(url: string){
     const res = await fetch(url);
     const buff = await res.blob();
     return buff.type.startsWith('image/')
}
