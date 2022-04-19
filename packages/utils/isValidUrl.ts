export const isValidUrl = (url: string) => {
  if (url === '') {
    return true
  } else {
    const regex = /^https:\/\/[^\s]*\.(?:gif|png|jpg|jpeg|svg)$/
    return regex.test(url)
  }
}
