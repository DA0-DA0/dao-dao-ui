import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { genericTokenBalancesSelector } from '@dao-dao/state'
import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { Loader, useCachedLoading } from '@dao-dao/stateless'
import { ActionComponent, TokenType } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/CwTokenSwap'
import {
  CHAIN_BECH32_PREFIX,
  CODE_ID_CONFIG,
  NATIVE_TOKEN,
  convertDenomToMicroDenomWithDecimals,
  isValidAddress,
  isValidContractAddress,
  processError,
} from '@dao-dao/utils'

import { AddressInput, Trans } from '../../../../../components'
import { useTokenBalances } from '../../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../../react'
import { InstantiateTokenSwap as StatelessInstantiateTokenSwap } from '../stateless/InstantiateTokenSwap'
import { InstantiateTokenSwapOptions, PerformTokenSwapData } from '../types'

export const InstantiateTokenSwap: ActionComponent<
  undefined,
  PerformTokenSwapData
> = (props) => {
  const { address: selfAddress, t } = useActionOptions()
  const { setValue } = useFormContext()
  const { address: walletAddress, signingCosmWasmClient } = useWallet()

  const selfPartyTokenBalances = useTokenBalances()

  const [instantiating, setInstantiating] = useState(false)
  const onInstantiate = useCallback(async () => {
    const { selfParty, counterparty } = props.data

    if (!selfParty || !counterparty) {
      toast.error(t('error.loadingData'))
      return
    }

    if (!walletAddress || !signingCosmWasmClient) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setInstantiating(true)

    try {
      const instantiateMsg: InstantiateMsg = {
        counterparty_one: {
          address: selfAddress,
          promise:
            selfParty.type === 'cw20'
              ? {
                  cw20: {
                    contract_addr: selfParty.denomOrAddress,
                    amount: convertDenomToMicroDenomWithDecimals(
                      selfParty.amount,
                      selfParty.decimals
                    ).toString(),
                  },
                }
              : {
                  native: {
                    denom: selfParty.denomOrAddress,
                    amount: convertDenomToMicroDenomWithDecimals(
                      selfParty.amount,
                      selfParty.decimals
                    ).toString(),
                  },
                },
        },
        counterparty_two: {
          address: counterparty.address,
          promise:
            counterparty.type === 'cw20'
              ? {
                  cw20: {
                    contract_addr: counterparty.denomOrAddress,
                    amount: convertDenomToMicroDenomWithDecimals(
                      counterparty.amount,
                      counterparty.decimals
                    ).toString(),
                  },
                }
              : {
                  native: {
                    denom: counterparty.denomOrAddress,
                    amount: convertDenomToMicroDenomWithDecimals(
                      counterparty.amount,
                      counterparty.decimals
                    ).toString(),
                  },
                },
        },
      }

      const { contractAddress } = await signingCosmWasmClient.instantiate(
        walletAddress,
        CODE_ID_CONFIG.CwTokenSwap,
        instantiateMsg,
        'Token Swap',
        'auto'
      )

      // Update action form data with address.
      setValue(
        props.fieldNamePrefix + 'tokenSwapContractAddress',
        contractAddress,
        {
          shouldValidate: true,
        }
      )
      // Indicate that contract is ready.
      setValue(props.fieldNamePrefix + 'contractChosen', true, {
        shouldValidate: true,
      })
      // Display success.
      toast.success(t('success.tokenSwapContractInstantiated'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }, [
    props.data,
    props.fieldNamePrefix,
    selfAddress,
    setValue,
    signingCosmWasmClient,
    t,
    walletAddress,
  ])

  return selfPartyTokenBalances.loading ? (
    <Loader />
  ) : (
    <InnerInstantiateTokenSwap
      {...props}
      options={{
        selfPartyTokenBalances: selfPartyTokenBalances.data,
        instantiating,
        onInstantiate,
        AddressInput,
        Trans,
      }}
    />
  )
}

const InnerInstantiateTokenSwap: ActionComponent<
  Omit<InstantiateTokenSwapOptions, 'counterpartyTokenBalances'>
> = (props) => {
  const { chainId } = useActionOptions()
  const { resetField, watch } = useFormContext()

  // Only set defaults once.
  const selfParty = watch(props.fieldNamePrefix + 'selfParty')
  const counterparty = watch(props.fieldNamePrefix + 'counterparty')
  const [defaultsSet, setDefaultsSet] = useState(!!selfParty && !!counterparty)

  // Set form defaults on load if necessary.
  useEffect(() => {
    if (defaultsSet) {
      return
    }

    // Default selfParty to first CW20 if present. Otherwise, native.
    const selfPartyDefaultCw20 = props.options.selfPartyTokenBalances.find(
      (tokenBalance) => tokenBalance.token.type === TokenType.Cw20
    )

    resetField(props.fieldNamePrefix + 'selfParty', {
      defaultValue: {
        type: selfPartyDefaultCw20 ? TokenType.Cw20 : TokenType.Native,
        denomOrAddress: selfPartyDefaultCw20
          ? selfPartyDefaultCw20.token.denomOrAddress
          : NATIVE_TOKEN.denomOrAddress,
        amount: 0,
        decimals: selfPartyDefaultCw20
          ? selfPartyDefaultCw20.token.decimals
          : NATIVE_TOKEN.decimals,
      },
    })
    resetField(props.fieldNamePrefix + 'counterparty', {
      defaultValue: {
        address: '',
        type: 'native',
        denomOrAddress: NATIVE_TOKEN.denomOrAddress,
        amount: 0,
        decimals: NATIVE_TOKEN.decimals,
      },
    })

    setDefaultsSet(true)
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const counterpartyAddress: string | undefined = watch(
    props.fieldNamePrefix + 'counterparty.address'
  )

  // Try to retrieve governance token address, failing if not a cw20-based DAO.
  const counterpartyDaoGovernanceTokenAddressLoadable = useRecoilValueLoadable(
    counterpartyAddress &&
      isValidContractAddress(counterpartyAddress, CHAIN_BECH32_PREFIX)
      ? DaoCoreV2Selectors.tryFetchGovernanceTokenAddressSelector({
          contractAddress: counterpartyAddress,
          chainId,
        })
      : constSelector(undefined)
  )

  // Load balances as loadables since they refresh automatically on a timer.
  const counterpartyTokenBalances = useCachedLoading(
    counterpartyAddress &&
      isValidAddress(counterpartyAddress, CHAIN_BECH32_PREFIX) &&
      counterpartyDaoGovernanceTokenAddressLoadable.state !== 'loading'
      ? genericTokenBalancesSelector({
          address: counterpartyAddress,
          cw20GovernanceTokenAddress:
            counterpartyDaoGovernanceTokenAddressLoadable.state === 'hasValue'
              ? counterpartyDaoGovernanceTokenAddressLoadable.contents
              : undefined,
          chainId,
        })
      : undefined,
    []
  )

  // Wait for defaults to be set before loading component with form inputs.
  return defaultsSet ? (
    <StatelessInstantiateTokenSwap
      {...props}
      options={{
        ...props.options,
        counterpartyTokenBalances,
      }}
    />
  ) : (
    <Loader />
  )
}
