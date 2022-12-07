import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { ActionComponent } from '@dao-dao/types'

import { useTokenSwapStatusInfoForContract } from '../../../hooks/useTokenSwapStatusInfoForContract'
import { ExistingTokenSwap } from '../../components/token_swap'
import { useActionOptions } from '../../react'

export const FundTokenSwap: ActionComponent = (props) => {
  const { address, chainId, t } = useActionOptions()

  const { watch, setValue } = useFormContext()
  const tokenSwapContractAddress: string | undefined = watch(
    props.fieldNamePrefix + 'tokenSwapContractAddress'
  )

  if (!tokenSwapContractAddress) {
    throw new Error(t('error.loadingData'))
  }

  const {
    selfParty,
    selfPartyTokenInfo,
    selfPartyAmount,
    props: tokenSwapStatusProps,
  } = useTokenSwapStatusInfoForContract({
    contractAddress: tokenSwapContractAddress,
    chainId,
    selfPartyAddress: address,
  })

  // Set selfParty in the form if it's missing. This is needed in case the user
  // entered an existing token swap contract address, since the action's
  // transform function needs to know what tokens to send to the contract.
  const watchSelfParty = watch(props.fieldNamePrefix + 'selfParty')
  useEffect(() => {
    if (!watchSelfParty) {
      setValue(props.fieldNamePrefix + 'selfParty', {
        type: 'cw20' in selfParty.promise ? 'cw20' : 'native',
        denomOrAddress: selfPartyTokenInfo.denomOrAddress,
        amount: selfPartyAmount,
        decimals: selfPartyTokenInfo.decimals,
      })
    }
  }, [
    props.fieldNamePrefix,
    selfParty,
    selfPartyAmount,
    selfPartyTokenInfo.decimals,
    selfPartyTokenInfo.denomOrAddress,
    setValue,
    watchSelfParty,
  ])

  return (
    <ExistingTokenSwap
      {...props}
      options={{
        tokenSwapStatusProps,
        status: t('info.actionPaysTokenSwap', {
          context: selfParty.provided ? 'paid' : 'unpaid',
          amount: selfPartyAmount.toLocaleString(undefined, {
            maximumFractionDigits: selfPartyTokenInfo.decimals,
          }),
          tokenSymbol: selfPartyTokenInfo.symbol,
        }),
      }}
    />
  )
}
