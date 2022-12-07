import { useFormContext } from 'react-hook-form'

import { ActionComponent } from '@dao-dao/types'

import { useTokenSwapStatusInfoForContract } from '../../../hooks/useTokenSwapStatusInfoForContract'
import { ExistingTokenSwap } from '../../components/token_swap'
import { useActionOptions } from '../../react'

export const WithdrawTokenSwap: ActionComponent = (props) => {
  const { address, chainId, t } = useActionOptions()

  const { watch } = useFormContext()
  const tokenSwapContractAddress: string | undefined = watch(
    props.fieldNamePrefix + 'tokenSwapContractAddress'
  )

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
