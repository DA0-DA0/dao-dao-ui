// Makes an error returned by a failed smart contract execution more
// readable.
export const cleanChainError = (error: string): string => {
  // Errors will either have a stack trace followed by the actual
  // error or just the actual error. In either case the error in
  // question is just the last line of the returned string.
  const lines = error.split('\n')
  const errorLine = lines[lines.length - 1]

  // Log error to console to assist in debugging.
  console.error(error)

  if (errorLine.startsWith('Account does not exist on chain')) {
    return 'One of the accounts in this transaction does not exist on chain. Try sending some Juno to the address.'
  }
  if (errorLine.includes('account sequence mismatch')) {
    return 'You have a different transaction pending. Please wait a little and then try again.'
  }

  return errorLine
}
