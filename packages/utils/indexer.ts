import { INDEXER_BASE } from './constants'

export const queryIndexer = async <T = any>(
  contractAddress: string,
  formulaName: string,
  blockHeight?: number
): Promise<T> => {
  const response = await fetch(
    `${INDEXER_BASE}/${contractAddress}/${formulaName}` +
      (blockHeight ? `?blockHeight=${blockHeight}` : '')
  )
  return response.json()
}
