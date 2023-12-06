import cloneDeep from 'lodash.clonedeep'

import {
  GenericToken,
  GenericTokenSource,
  LooseGenericToken,
  PfmMemo,
  TokenType,
} from '@dao-dao/types'
import { AssetInfo } from '@dao-dao/types/contracts/WyndexMultiHop'

import { getChainForChainName, getIbcTransferInfoFromChannel } from './chain'
import { objectMatchesStructure } from './objectMatchesStructure'

export const genericTokenToAssetInfo = (token: GenericToken): AssetInfo =>
  token.type === TokenType.Native
    ? {
        native: token.denomOrAddress,
      }
    : {
        token: token.denomOrAddress,
      }

export const tokenDenomOrAddressFromAssetInfo = (
  assetInfo: AssetInfo
): string => ('native' in assetInfo ? assetInfo.native : assetInfo.token)

export const tokensEqual = (
  a: LooseGenericToken,
  b: LooseGenericToken
): boolean =>
  a.chainId === b.chainId &&
  a.type === b.type &&
  a.denomOrAddress === b.denomOrAddress

export const serializeTokenSource = (
  tokenOrSource: GenericToken | GenericTokenSource
): string => {
  const source = 'type' in tokenOrSource ? tokenOrSource.source : tokenOrSource
  return `${source.chainId}:${source.denomOrAddress}`
}
export const deserializeTokenSource = (source: string): GenericTokenSource => {
  const [chainId, denomOrAddress] = source.split(':')
  return {
    chainId,
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
