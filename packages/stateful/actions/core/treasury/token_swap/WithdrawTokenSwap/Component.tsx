import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types'

import { useTokenSwapStatusInfoForContract } from '../../../../../hooks/useTokenSwapStatusInfoForContract'
import { useActionOptions } from '../../../../react'
import { ExistingTokenSwap } from '../stateless/ExistingTokenSwap'

export const WithdrawTokenSwap: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()

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
