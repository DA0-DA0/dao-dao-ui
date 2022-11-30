import { t } from 'i18next'
import { useFormContext } from 'react-hook-form'

import { ActionComponent } from '@dao-dao/types'

import { useTokenSwapStatusInfoForContract } from '../../../hooks/useTokenSwapStatusInfoForContract'
import { WithdrawTokenSwap as StatelessWithdrawTokenSwap } from '../../components/token_swap'
import { useActionOptions } from '../../react'

export const WithdrawTokenSwap: ActionComponent = (props) => {
  const { address, chainId } = useActionOptions()

  const { watch } = useFormContext()
  const tokenSwapContractAddress: string | undefined = watch(
    props.fieldNamePrefix + 'tokenSwapContractAddress'
  )

  if (!tokenSwapContractAddress) {
    throw new Error(t('error.loadingData'))
  }

  const { props: tokenSwapStatusProps } = useTokenSwapStatusInfoForContract({
    contractAddress: tokenSwapContractAddress,
    chainId,
    selfPartyAddress: address,
  })

  return (
    <StatelessWithdrawTokenSwap
      {...props}
      options={{
        tokenSwapStatusProps,
      }}
    />
  )
}
