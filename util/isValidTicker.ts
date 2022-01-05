function get_bytes(s: string) {
  const utf8 = new TextEncoder()
  const bytes = utf8.encode(s)
  return bytes
}

// Same as the `is_valid_symbol` function in cw20-base in the cw-plus
// repo. Same a regex `[a-zA-Z\\-]{3,12}`.
export function isValidTicker(ticker: string): boolean {
  const bytes = get_bytes(ticker)
  if (bytes.length < 3 || bytes.length > 12) {
    return false
  }
  return bytes.every((byte) => {
    if ((byte != 45) && (byte < 65 || byte > 90) && (byte < 97 || byte > 122)) {
      return false
    }
    return true
  })
}

// Same as the `is_valid_name` function in cw20-base in the cw-plus
// repo.
export function isValidName(name: string): boolean {
  const bytes = get_bytes(name)
  if (bytes.length < 3 || bytes.length > 50) {
    return false
  }
  return true
}
