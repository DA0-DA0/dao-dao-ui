import { useRecoilValue } from 'recoil'

import {
  CwTokenSwapSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { TokenSwapStatusProps, TokenType, WithChainId } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { EntityDisplay } from '../components'

export type UseTokenSwapStatusInfoForContractOptions = WithChainId<{
  contractAddress: string
  selfPartyAddress: string
}>

// Returns info for a given token swap, with the parties identified between self
// and counter. Also collects the metadata into props for the TokenSwapStatus
// stateless component. This hook is used in the PerformTokenSwap and
// WithdrawTokenSwap stateful action components.
export const useTokenSwapStatusInfoForContract = ({
  chainId,
  contractAddress,
  selfPartyAddress,
}: UseTokenSwapStatusInfoForContractOptions) => {
  const tokenSwapStatus = useRecoilValue(
    CwTokenSwapSelectors.statusSelector({
      contractAddress,
      chainId,
      params: [],
    })
  )

  const selfParty =
    tokenSwapStatus.counterparty_one.address === selfPartyAddress
      ? tokenSwapStatus.counterparty_one
      : tokenSwapStatus.counterparty_two
  const counterparty =
    tokenSwapStatus.counterparty_one.address === selfPartyAddress
      ? tokenSwapStatus.counterparty_two
      : tokenSwapStatus.counterparty_one

  const selfPartyTokenInfo = useRecoilValue(
    genericTokenSelector({
      chainId,
      type: 'cw20' in selfParty.promise ? TokenType.Cw20 : TokenType.Native,
      denomOrAddress:
        'cw20' in selfParty.promise
          ? selfParty.promise.cw20.contract_addr
          : selfParty.promise.native.denom,
    })
  )
  const selfPartyAmount = convertMicroDenomToDenomWithDecimals(
    'cw20' in selfParty.promise
      ? selfParty.promise.cw20.amount
      : selfParty.promise.native.amount,
    selfPartyTokenInfo.decimals
  )

  const counterpartyTokenInfo = useRecoilValue(
    genericTokenSelector({
      chainId,
      type: 'cw20' in counterparty.promise ? TokenType.Cw20 : TokenType.Native,
      denomOrAddress:
        'cw20' in counterparty.promise
          ? counterparty.promise.cw20.contract_addr
          : counterparty.promise.native.denom,
    })
  )
  const counterpartyAmount = convertMicroDenomToDenomWithDecimals(
    'cw20' in counterparty.promise
      ? counterparty.promise.cw20.amount
      : counterparty.promise.native.amount,
    counterpartyTokenInfo.decimals
  )

  const props: TokenSwapStatusProps = {
    selfParty: {
      address: selfParty.address,
      amount: selfPartyAmount,
      decimals: selfPartyTokenInfo.decimals,
      symbol: selfPartyTokenInfo.symbol,
      tokenLogoUrl: selfPartyTokenInfo.imageUrl,
      provided: selfParty.provided,
    },
    counterparty: {
      address: counterparty.address,
      amount: counterpartyAmount,
      decimals: counterpartyTokenInfo.decimals,
      symbol: counterpartyTokenInfo.symbol,
      tokenLogoUrl: counterpartyTokenInfo.imageUrl,
      provided: counterparty.provided,
    },
    EntityDisplay,
  }

  return {
    selfParty,
    selfPartyTokenInfo,
    selfPartyAmount,
    counterparty,
    counterpartyTokenInfo,
    counterpartyAmount,
    props,
  }
}
