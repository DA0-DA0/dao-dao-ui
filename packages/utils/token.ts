import cloneDeep from 'lodash.clonedeep'

import {
  GenericToken,
  GenericTokenSource,
  LooseGenericToken,
  PfmMemo,
  SortFn,
  TokenCardInfo,
} from '@dao-dao/types'

import { getChainForChainName, getIbcTransferInfoFromChannel } from './chain'
import { objectMatchesStructure } from './objectMatchesStructure'

export const tokensEqual = (
  a: LooseGenericToken,
  b: LooseGenericToken
): boolean =>
  a.chainId === b.chainId &&
  a.type === b.type &&
  a.denomOrAddress === b.denomOrAddress

export const tokenSourcesEqual = (
  a: GenericToken | GenericTokenSource,
  b: GenericToken | GenericTokenSource
): boolean => serializeTokenSource(a) === serializeTokenSource(b)

export const serializeTokenSource = (
  tokenOrSource: GenericToken | GenericTokenSource
): string => {
  const source =
    'source' in tokenOrSource ? tokenOrSource.source : tokenOrSource
  return [source.chainId, source.type, source.denomOrAddress].join(':')
}

export const deserializeTokenSource = (source: string): GenericTokenSource => {
  const [chainId, type, denomOrAddress] = source.split(':')
  return {
    chainId,
    type: type as GenericTokenSource['type'],
    denomOrAddress,
  }
}

/**
 * Validate if a string or object is a valid packet-forward-middleware memo.
 */
export const isValidPfmMemo = (
  memo: string | Record<string, unknown>
): boolean => {
  try {
    const memoObj: PfmMemo = typeof memo === 'string' ? JSON.parse(memo) : memo

    return (
      objectMatchesStructure(memoObj, {
        forward: {
          receiver: {},
          port: {},
          channel: {},
        },
      }) &&
      // Validate next if present.
      (!memoObj.forward.next || isValidPfmMemo(memoObj.forward.next!))
    )
  } catch {
    return false
  }
}

/**
 * Parse a valid packet-forward-middleware memo and return a typed object or
 * undefined if invalid.
 */
export const parseValidPfmMemo = (
  memo: string | Record<string, unknown>
): PfmMemo | undefined => {
  if (!isValidPfmMemo(memo)) {
    return
  }

  const memoObj: PfmMemo =
    typeof memo === 'string' ? JSON.parse(memo) : cloneDeep(memo)
  if (memoObj.forward.next) {
    memoObj.forward.next = parseValidPfmMemo(memoObj.forward.next)
  }

  return memoObj
}

/**
 * Get the sequence of chains in a packet-forward-middleware memo.
 */
export const getPfmChainPathFromMemo = (
  sourceChainId: string,
  sourceChannelId: string,
  memo?: PfmMemo
): string[] => {
  const memoObj = memo && parseValidPfmMemo(memo)

  const {
    destinationChain: { chain_name },
  } = getIbcTransferInfoFromChannel(sourceChainId, sourceChannelId)
  const toChainId = getChainForChainName(chain_name).chain_id

  return [
    sourceChainId,
    ...(memoObj
      ? getPfmChainPathFromMemo(
          toChainId,
          memoObj.forward.channel,
          memoObj.forward.next
        )
      : [toChainId]),
  ]
}

/**
 * Get the last receiver in a packet-forward-middleware memo.
 */
export const getPfmFinalReceiverFromMemo = (memo: PfmMemo): string =>
  memo.forward.next
    ? getPfmFinalReceiverFromMemo(memo.forward.next)
    : memo.forward.receiver

/**
 * Function to sort token lists descending by USD value.
 */
export const sortTokensValueDescending: SortFn<
  Pick<TokenCardInfo, 'token' | 'unstakedBalance' | 'lazyInfo'>
> = (a, b) => {
  // If loading or no price, show at bottom.
  const aPrice =
    a.lazyInfo.loading || !a.lazyInfo.data.usdUnitPrice?.usdPrice
      ? undefined
      : a.lazyInfo.data.totalBalance.times(
          a.lazyInfo.data.usdUnitPrice.usdPrice
        )
  const bPrice =
    b.lazyInfo.loading || !b.lazyInfo.data.usdUnitPrice?.usdPrice
      ? undefined
      : b.lazyInfo.data.totalBalance.times(
          b.lazyInfo.data.usdUnitPrice.usdPrice
        )

  // If prices are equal, sort alphabetically by symbol.
  return aPrice === bPrice
    ? a.token.symbol
        .toLocaleLowerCase()
        .localeCompare(b.token.symbol.toLocaleLowerCase())
    : aPrice === undefined
    ? 1
    : bPrice === undefined
    ? -1
    : aPrice.eq(bPrice)
    ? 0
    : aPrice.gt(bPrice)
    ? -1
    : 1
}

/**
 * Function to sort token lists ascending by USD value.
 */
export const sortTokensValueAscending: SortFn<
  Pick<TokenCardInfo, 'token' | 'unstakedBalance' | 'lazyInfo'>
> = (a, b) => {
  // If loading or no price, show at bottom.
  const aPrice =
    a.lazyInfo.loading || !a.lazyInfo.data.usdUnitPrice?.usdPrice
      ? undefined
      : a.lazyInfo.data.totalBalance.times(
          a.lazyInfo.data.usdUnitPrice.usdPrice
        )
  const bPrice =
    b.lazyInfo.loading || !b.lazyInfo.data.usdUnitPrice?.usdPrice
      ? undefined
      : b.lazyInfo.data.totalBalance.times(
          b.lazyInfo.data.usdUnitPrice.usdPrice
        )

  // If prices are equal, sort alphabetically by symbol.
  return aPrice === bPrice
    ? a.token.symbol
        .toLocaleLowerCase()
        .localeCompare(b.token.symbol.toLocaleLowerCase())
    : aPrice === undefined
    ? 1
    : bPrice === undefined
    ? -1
    : aPrice.eq(bPrice)
    ? 0
    : aPrice.gt(bPrice)
    ? 1
    : -1
}
