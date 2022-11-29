import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
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
  loadableToLoadingData,
  nativeTokenDecimals,
  processError,
} from '@dao-dao/utils'

import { useCw20GovernanceTokenInfoResponseIfExists } from '../../../voting-module-adapter/react/hooks/useCw20GovernanceTokenInfoResponseIfExists'
import {
  InitiateTokenSwapData,
  InstantiateFormData,
  InstantiateTokenSwap as StatelessInstantiateTokenSwap,
  InstantiateTokenSwapProps as StatelessInstantiateTokenSwapProps,
} from '../../components/InitiateTokenSwap'
import { useActionOptions } from '../../react'

export const InstantiateTokenSwap: ActionComponent = ({ fieldNamePrefix }) => {
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
  const onInstantiate = useCallback(
    async (data: InstantiateFormData) => {
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
              data.selfParty.type === 'cw20'
                ? {
                    cw20: {
                      contract_addr: data.selfParty.denomOrAddress,
                      amount: convertDenomToMicroDenomWithDecimals(
                        data.selfParty.amount,
                        data.selfParty.decimals
                      ).toString(),
                    },
                  }
                : {
                    native: {
                      denom: data.selfParty.denomOrAddress,
                      amount: convertDenomToMicroDenomWithDecimals(
                        data.selfParty.amount,
                        data.selfParty.decimals
                      ).toString(),
                    },
                  },
          },
          counterparty_two: {
            address: data.counterparty.address,
            promise:
              data.counterparty.type === 'cw20'
                ? {
                    cw20: {
                      contract_addr: data.counterparty.denomOrAddress,
                      amount: convertDenomToMicroDenomWithDecimals(
                        data.counterparty.amount,
                        data.counterparty.decimals
                      ).toString(),
                    },
                  }
                : {
                    native: {
                      denom: data.counterparty.denomOrAddress,
                      amount: convertDenomToMicroDenomWithDecimals(
                        data.counterparty.amount,
                        data.counterparty.decimals
                      ).toString(),
                    },
                  },
          },
        }

        const { contractAddress } = await signingCosmWasmClient.instantiate(
          walletAddress,
          CODE_ID_CONFIG.CwTokenSwap,
          instantiateMsg,
          `TokenSwap_${data.selfParty.denomOrAddress}_${data.counterparty.denomOrAddress}`,
          'auto'
        )

        // Update action form data with funding details.
        setValue(fieldNamePrefix + 'tokenSwapContract', {
          address: contractAddress,
          type: data.selfParty.type,
          denomOrAddress: data.selfParty.denomOrAddress,
          amount: convertDenomToMicroDenomWithDecimals(
            data.selfParty.amount,
            data.selfParty.decimals
          ),
        } as InitiateTokenSwapData['tokenSwapContract'])
        // Display success.
        toast.success(t('success.tokenSwapContractInstantiated'))
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setInstantiating(false)
      }
    },
    [
      fieldNamePrefix,
      selfAddress,
      setValue,
      signingCosmWasmClient,
      t,
      walletAddress,
    ]
  )

  return selfPartyNativeBalances === undefined ||
    selfPartyCw20Balances === undefined ? (
    <Loader />
  ) : (
    <InnerInstantiateTokenSwap
      instantiating={instantiating}
      onInstantiate={onInstantiate}
      selfPartyCw20Balances={selfPartyCw20Balances}
      selfPartyNativeBalances={selfPartyNativeBalances}
    />
  )
}

const InnerInstantiateTokenSwap = (
  props: Omit<
    StatelessInstantiateTokenSwapProps,
    | 'instantiateForm'
    | 'counterpartyNativeBalances'
    | 'counterpartyCw20Balances'
  >
) => {
  const { chainId } = useActionOptions()

  // Default selfParty to first CW20 if present. Otherwise, native.
  const selfPartyDefaultCw20 =
    props.selfPartyCw20Balances && props.selfPartyCw20Balances.length > 0
      ? props.selfPartyCw20Balances[0]
      : undefined

  const instantiateForm = useForm<InstantiateFormData>({
    defaultValues: {
      selfParty: {
        type: selfPartyDefaultCw20 ? 'cw20' : 'native',
        denomOrAddress: selfPartyDefaultCw20
          ? selfPartyDefaultCw20.address
          : NATIVE_DENOM,
        amount: 0,
        decimals: selfPartyDefaultCw20
          ? selfPartyDefaultCw20.info.decimals
          : nativeTokenDecimals(NATIVE_DENOM) ?? 0,
      },
      counterparty: {
        address: '',
        type: 'native',
        denomOrAddress: NATIVE_DENOM,
        amount: 0,
        decimals: nativeTokenDecimals(NATIVE_DENOM) ?? 0,
      },
    },
  })

  const counterpartyAddress = instantiateForm.watch('counterparty.address')

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
    isValidAddress(counterpartyAddress, CHAIN_BECH32_PREFIX)

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
    // If errors
    []
  )

  return (
    <StatelessInstantiateTokenSwap
      {...props}
      counterpartyCw20Balances={
        counterpartyDaoCw20Balances.loading
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
            }
      }
      counterpartyNativeBalances={counterpartyNativeBalances}
      instantiateForm={instantiateForm}
    />
  )
}
