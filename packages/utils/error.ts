import * as Sentry from '@sentry/nextjs'

// Passing a map will allow common errors to be mapped to a custom error message
// for the given context.
export const processError = (
  error: Error | any,
  {
    extra,
    transform,
    overrideCapture,
  }: {
    extra?: Record<string, string | number>
    transform?: Partial<Record<CommonError, string>>
    overrideCapture?: Partial<Record<CommonError, boolean>>
  } = {}
): string => {
  // Convert to error type.
  if (!(error instanceof Error)) {
    error = new Error(`${error}`)
  }

  const { message } = error
  let recognizedError

  // Attempt to recognize error.
  for (const [commonError, patterns] of commonErrorPatternsEntries) {
    // Match if any elements are matches.
    const match = patterns.some((pattern) =>
      Array.isArray(pattern)
        ? // If array of strings, every element must match.
          pattern.every((p) => message.includes(p))
        : message.includes(pattern)
    )
    // If recognized error, break.
    if (match) {
      recognizedError = commonError
      break
    }
  }

  // If recognized error, try to find it in the map, or else return the
  // recognized error.
  if (recognizedError) {
    // Sent to Sentry if we want to capture this recognized error.
    const shouldCapture =
      (overrideCapture && overrideCapture[recognizedError]) ??
      captureCommonErrorMap[recognizedError]
    if (shouldCapture) {
      Sentry.captureException(error, { extra })
    }

    return ((transform && transform[recognizedError]) ||
      recognizedError) as string
  }

  // Send to Sentry since we were not expecting it.
  Sentry.captureException(error, { extra })

  // If no recognized error, return error message by default.
  return message
}

// To add a new error:
// 1. Add a value to this enum.
// 2. Add matching parameters in commonErrorPatterns below.
// 3. If it should be sent to Sentry, add an entry to captureCommonErrorMap.
export enum CommonError {
  RequestRejected = 'Wallet rejected transaction.',
  InvalidAddress = 'Invalid address.',
  InsufficientFees = "Insufficient fees. Reconnect your wallet, ensure you're on the right chain, and try again.",
  InsufficientFunds = 'Insufficient funds.',
  GetClientFailed = 'Failed to get client. Try refreshing the page or reconnecting your wallet.',
  Network = 'Network error. Ensure you are connected to the internet, refresh the page, or try again later. If your network is working, the blockchain nodes may be having problems.',
  Unauthorized = 'Unauthorized.',
  InsufficientForProposalDeposit = 'Insufficient unstaked governance tokens. Ensure you have enough unstaked governance tokens on DAO DAO to pay for the proposal deposit.',
  PendingTransaction = 'You have another pending transaction. Please try again in 30 seconds.',
  NotFound = 'Not found.',
  TextEncodingDecodingError = 'Text encoding/decoding error. Invalid character present in text.',
  TxnSentTimeout = 'Transaction sent but has not yet been detected. Refresh this page to view its changes or check back later.',
  InvalidJSONResponse = 'Invalid JSON response from server.',
  NodeFailure = 'The blockchain nodes seem to be having problems. Try again later.',
  BlockHeightTooLow = 'Block height is too low.',
  TxPageOutOfRange = 'Transaction page is out of range.',
}

// List of error substrings to match to determine the common error. Elements in
// value are OR'd together. Inner string arrays are AND'd together. For example:
// ["abc", "def"] matches "abc" or "def" or "abc def". ["abc", ["def", "ghi"]]
// matches "abc def ghi" or "def ghi" but NOT "abc def" or "abc ghi".
const commonErrorPatterns: Record<CommonError, (string | string[])[]> = {
  [CommonError.RequestRejected]: ['Request rejected'],
  [CommonError.InvalidAddress]: [
    'decoding bech32 failed: invalid checksum',
    'contract: not found',
    // Provided non-DAO address where a DAO address was expected.
    'unknown variant `get_config`',
  ],
  [CommonError.InsufficientFees]: ['insufficient fees'],
  [CommonError.InsufficientFunds]: [
    'insufficient funds',
    // Try to send money with no balance.
    'Account does not exist on chain.',
    ['fee payer address', 'does not exist'],
  ],
  [CommonError.GetClientFailed]: [
    'Bad status on response: 403',
    'Failed to retrieve account from signer',
  ],
  [CommonError.Network]: [
    'Failed to fetch',
    'socket disconnected',
    'socket hang up',
    'Bad status on response: 5',
    'ECONNREFUSED',
    'ETIMEDOUT',
    'panic: invalid request',
    'tx already exists in cache',
  ],
  [CommonError.Unauthorized]: ['Unauthorized'],
  [CommonError.InsufficientForProposalDeposit]: ['Overflow: Cannot Sub with'],
  [CommonError.PendingTransaction]: ['account sequence mismatch'],
  [CommonError.NotFound]: ['not found'],
  [CommonError.TextEncodingDecodingError]: ['out of printable ASCII range'],
  [CommonError.TxnSentTimeout]: [
    'was submitted but was not yet found on the chain',
  ],
  [CommonError.InvalidJSONResponse]: [
    'invalid json response body',
    'Unexpected token < in JSON',
  ],
  [CommonError.NodeFailure]: ['goroutine'],
  [CommonError.BlockHeightTooLow]: [
    ['32603', 'not available', 'lowest height is'],
  ],
  [CommonError.TxPageOutOfRange]: [
    ['32603', 'page should be within', 'range', 'given'],
  ],
}
const commonErrorPatternsEntries = Object.entries(commonErrorPatterns) as [
  CommonError,
  (string | string[])[]
][]

// Whether or not to send the error to Sentry. Some errors we want to clean up
// for the user but still investigate (e.g. InvalidJSONResponse), so let's send
// them to Sentry even if we recognize them.
const captureCommonErrorMap: Partial<Record<CommonError, boolean>> = {
  [CommonError.InvalidJSONResponse]: true,
}
