import { GenericToken, LooseGenericToken, TokenType } from '@dao-dao/types'
import { AssetInfo } from '@dao-dao/types/contracts/WyndexMultiHop'

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
  tokenOrSource: GenericToken | GenericToken['source']
): string => {
  const source = 'type' in tokenOrSource ? tokenOrSource.source : tokenOrSource
  return `${source.chainId}:${source.denomOrAddress}`
}
export const deserializeTokenSource = (
  source: string
): GenericToken['source'] => {
  const [chainId, denomOrAddress] = source.split(':')
  return {
    chainId,
    denomOrAddress,
  }
}
