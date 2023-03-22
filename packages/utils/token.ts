import { GenericToken, TokenType } from '@dao-dao/types'
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
