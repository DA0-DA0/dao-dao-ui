import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useActionOptions } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'

import { useTokenSwapStatusInfoForContract } from '../../../../../hooks/useTokenSwapStatusInfoForContract'
import { ExistingTokenSwap } from '../stateless/ExistingTokenSwap'

export interface WithdrawTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to enter an existing address. When `true`, it shows the
  // status of the swap. `tokenSwapContractAddress` should be defined and valid
  // when this is `true`.
  contractChosen: boolean
  tokenSwapContractAddress?: string
}

export const WithdrawTokenSwap: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chainId },
  } = useActionOptions()

  const { watch } = useFormContext<WithdrawTokenSwapData>()
  const tokenSwapContractAddress =
    watch(
      (props.fieldNamePrefix +
        'tokenSwapContractAddress') as 'tokenSwapContractAddress'
    ) || ''

  if (!tokenSwapContractAddress) {
    throw new Error(t('error.loadingData'))
  }

  const {
    selfParty,
    selfPartyAmount,
    selfPartyTokenInfo,
    props: tokenSwapStatusProps,
  } = useTokenSwapStatusInfoForContract({
    contractAddress: tokenSwapContractAddress,
    chainId,
    selfPartyAddress: address,
  })

  return (
    <ExistingTokenSwap
      {...props}
      options={{
        tokenSwapStatusProps,
        status: t('info.actionWithdrawsTokenSwap', {
          context: selfParty.provided ? 'pending' : 'done',
          amount: selfPartyAmount.toLocaleString(undefined, {
            maximumFractionDigits: selfPartyTokenInfo.decimals,
          }),
          tokenSymbol: selfPartyTokenInfo.symbol,
        }),
      }}
    />
  )
}
