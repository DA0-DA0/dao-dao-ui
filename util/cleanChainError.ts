// Makes an error returned by a failed smart contract execution more
// readable.
export function cleanChainError(error: string): string {
  // Errors will either have a stack trace followed by the actual
  // error or just the actual error. In either case the error in
  // question is just the last line of the returned string.
  const lines = error.split('\n')
  return lines[lines.length - 1]
}
