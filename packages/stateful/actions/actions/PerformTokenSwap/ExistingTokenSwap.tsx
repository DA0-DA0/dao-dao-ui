import { t } from 'i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import {
  CwTokenSwapSelectors,
  eitherTokenInfoSelector,
} from '@dao-dao/state/recoil'
import { ActionComponent, TokenSwapStatusProps } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { ProfileDisplay } from '../../../components'
import { ExistingTokenSwap as StatelessExistingTokenSwap } from '../../components/PerformTokenSwap'
import { useActionOptions } from '../../react'

export const ExistingTokenSwap: ActionComponent = (props) => {
  const { address, chainId } = useActionOptions()

  const { watch, setValue } = useFormContext()
  const tokenSwapContractAddress: string | undefined = watch(
    props.fieldNamePrefix + 'tokenSwapContractAddress'
  )

  if (!tokenSwapContractAddress) {
    throw new Error(t('error.loadingData'))
  }

  const tokenSwapStatus = useRecoilValue(
    CwTokenSwapSelectors.statusSelector({
      contractAddress: tokenSwapContractAddress,
      chainId,
      params: [],
    })
  )

  const selfParty =
    tokenSwapStatus.counterparty_one.address === address
      ? tokenSwapStatus.counterparty_one
      : tokenSwapStatus.counterparty_two
  const counterparty =
    tokenSwapStatus.counterparty_one.address === address
      ? tokenSwapStatus.counterparty_two
      : tokenSwapStatus.counterparty_one

  const selfPartyTokenInfo = useRecoilValue(
    eitherTokenInfoSelector({
      chainId,
      type: 'cw20' in selfParty.promise ? 'cw20' : 'native',
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
    eitherTokenInfoSelector({
      chainId,
      type: 'cw20' in counterparty.promise ? 'cw20' : 'native',
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

  const tokenSwapStatusProps: TokenSwapStatusProps = {
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
    ProfileDisplay,
  }

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
    <StatelessExistingTokenSwap
      {...props}
      options={{
        tokenSwapStatusProps,
      }}
    />
  )
}
