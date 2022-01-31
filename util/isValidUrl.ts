export function isValidUrl(url: string): boolean {
  if (url === '') {
    return true
  } else {
    return url.startsWith("https://") && (
      url.endsWith(".gif") || url.endsWith(".png")
      || url.endsWith(".jpg") || url.endsWith(".jpeg")
    )
  }
}
