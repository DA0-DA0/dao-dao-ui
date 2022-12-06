import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  CwdCoreV2Selectors,
  nativeBalancesSelector,
} from '@dao-dao/state/recoil'
import { Loader } from '@dao-dao/stateless'
import { useCachedLoadable } from '@dao-dao/stateless/hooks/useCachedLoadable'
import { ActionComponent, ActionOptionsContextType } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/CwTokenSwap'
import {
  CHAIN_BECH32_PREFIX,
  CODE_ID_CONFIG,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  isValidAddress,
  isValidContractAddress,
  loadableToLoadingData,
  nativeTokenDecimals,
  processError,
} from '@dao-dao/utils'

import { ProfileDisplay, Trans } from '../../../components'
import { useCw20GovernanceTokenInfoResponseIfExists } from '../../../voting-module-adapter/react/hooks/useCw20GovernanceTokenInfoResponseIfExists'
import {
  InstantiateTokenSwapOptions,
  PerformTokenSwapData,
  InstantiateTokenSwap as StatelessInstantiateTokenSwap,
} from '../../components/token_swap'
import { useActionOptions } from '../../react'

export const InstantiateTokenSwap: ActionComponent<
  undefined,
  PerformTokenSwapData
> = (props) => {
  const { address: selfAddress, context, chainId, t } = useActionOptions()
  const { setValue } = useFormContext()
  const { address: walletAddress, signingCosmWasmClient } = useWallet()

  // Get CW20 governance token address from voting module adapter if exists,
  // so we can make sure to load it with all cw20 balances, even if it has not
  // been explicitly added to the DAO.
  const { governanceTokenAddress } =
    useCw20GovernanceTokenInfoResponseIfExists() ?? {}

  // Load balances as loadables since they refresh automatically on a timer.
  const selfPartyNativeBalancesLoadable = useCachedLoadable(
    nativeBalancesSelector({
      address: selfAddress,
      chainId,
    })
  )
  const selfPartyNativeBalances =
    selfPartyNativeBalancesLoadable.state === 'hasValue'
      ? selfPartyNativeBalancesLoadable.contents.map(({ amount, denom }) => ({
          amount,
          denom,
        }))
      : undefined
  const selfPartyCw20BalancesLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? // Get DAO's cw20 balances and infos.
        CwdCoreV2Selectors.allCw20BalancesAndInfosSelector({
          contractAddress: selfAddress,
          chainId,
          governanceTokenAddress,
        })
      : undefined
  )
  const selfPartyCw20Balances =
    context.type === ActionOptionsContextType.Dao
      ? selfPartyCw20BalancesLoadable.state === 'hasValue'
        ? selfPartyCw20BalancesLoadable.contents.map(
            ({ addr, balance, info }) => ({
              address: addr,
              balance,
              info,
            })
          )
        : undefined
      : // If not a DAO, just use empty array. Can't fetch all CW20s for a wallet without an indexer.
        []

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
        `TokenSwap_${selfParty.denomOrAddress}_${counterparty.denomOrAddress}`,
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

  return selfPartyNativeBalances === undefined ||
    selfPartyCw20Balances === undefined ? (
    <Loader />
  ) : (
    <InnerInstantiateTokenSwap
      {...props}
      options={{
        selfPartyCw20Balances,
        selfPartyNativeBalances,
        instantiating,
        onInstantiate,
        ProfileDisplay,
        Trans,
      }}
    />
  )
}

const InnerInstantiateTokenSwap: ActionComponent<
  Omit<
    InstantiateTokenSwapOptions,
    'counterpartyNativeBalances' | 'counterpartyCw20Balances'
  >
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
    const selfPartyDefaultCw20 =
      props.options.selfPartyCw20Balances &&
      props.options.selfPartyCw20Balances.length > 0
        ? props.options.selfPartyCw20Balances[0]
        : undefined

    resetField(props.fieldNamePrefix + 'selfParty', {
      defaultValue: {
        type: selfPartyDefaultCw20 ? 'cw20' : 'native',
        denomOrAddress: selfPartyDefaultCw20
          ? selfPartyDefaultCw20.address
          : NATIVE_DENOM,
        amount: 0,
        decimals: selfPartyDefaultCw20
          ? selfPartyDefaultCw20.info.decimals
          : nativeTokenDecimals(NATIVE_DENOM) ?? 0,
      },
    })
    resetField(props.fieldNamePrefix + 'counterparty', {
      defaultValue: {
        address: '',
        type: 'native',
        denomOrAddress: NATIVE_DENOM,
        amount: 0,
        decimals: nativeTokenDecimals(NATIVE_DENOM) ?? 0,
      },
    })

    setDefaultsSet(true)
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const counterpartyAddress: string | undefined = watch(
    props.fieldNamePrefix + 'counterparty.address'
  )

  // Load balances as loadables since they refresh automatically on a timer.
  const counterpartyNativeBalances = loadableToLoadingData(
    useCachedLoadable(
      counterpartyAddress &&
        isValidAddress(counterpartyAddress, CHAIN_BECH32_PREFIX)
        ? nativeBalancesSelector({
            address: counterpartyAddress,
            chainId,
          })
        : undefined
    ),
    []
  )

  //! Try to get CW20s assuming it's a DAO.
  const counterpartyAddressIsContract =
    counterpartyAddress &&
    isValidContractAddress(counterpartyAddress, CHAIN_BECH32_PREFIX)

  // Try to retrieve governance token address, failing if not a cw20-based DAO.
  const counterpartyDaoGovernanceTokenAddress = useRecoilValueLoadable(
    counterpartyAddressIsContract
      ? CwdCoreV2Selectors.tryFetchGovernanceTokenAddressSelector({
          contractAddress: counterpartyAddress,
          chainId,
        })
      : constSelector(undefined)
  )
  // Try to get cw20 balances, failing if not a DAO.
  const counterpartyDaoCw20Balances = loadableToLoadingData(
    useCachedLoadable(
      counterpartyAddressIsContract &&
        counterpartyDaoGovernanceTokenAddress.state !== 'loading'
        ? // Get DAO's cw20 balances and infos.
          CwdCoreV2Selectors.allCw20BalancesAndInfosSelector({
            contractAddress: counterpartyAddress,
            chainId,
            governanceTokenAddress:
              // If did not error.
              counterpartyDaoGovernanceTokenAddress.state === 'hasValue'
                ? counterpartyDaoGovernanceTokenAddress.contents
                : undefined,
          })
        : undefined
    ),
    // Default to empty array if errors.
    []
  )

  // Wait for defaults to be set before loading component with form inputs.
  return defaultsSet ? (
    <StatelessInstantiateTokenSwap
      {...props}
      options={{
        ...props.options,
        // Can only get balances for DAO contract, not wallet. Non-DAO contracts
        // will error which defaults to empty array.
        counterpartyCw20Balances: !counterpartyAddressIsContract
          ? {
              loading: false,
              data: [],
            }
          : counterpartyDaoCw20Balances.loading
          ? { loading: true }
          : {
              loading: false,
              data: counterpartyDaoCw20Balances.data.map(
                ({ addr, balance, info }) => ({
                  address: addr,
                  balance,
                  info,
                })
              ),
            },
        counterpartyNativeBalances: counterpartyNativeBalances.loading
          ? // When loading, show native token placeholder. This prevents the denom select input from appearing empty.
            {
              loading: false,
              data: [
                {
                  amount: '0',
                  denom: NATIVE_DENOM,
                },
              ],
            }
          : counterpartyNativeBalances,
      }}
    />
  ) : (
    <Loader />
  )
}
