import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CreateCw1Whitelist } from '@dao-dao/types'
import { InstantiateMsg as Cw1WhitelistInstantiateMsg } from '@dao-dao/types/contracts/Cw1Whitelist'
import {
  getSupportedChainConfig,
  instantiateSmartContract,
  isValidBech32Address,
  processError,
} from '@dao-dao/utils'

import { useWallet } from './useWallet'

export type UseCreateCw1WhitelistOptions = {
  /**
   * If passed, use this chain. Otherwise, use the current chain context.
   */
  chainId?: string
  /**
   * If passed, will be executed with the parameters passed before
   * instantiating.
   */
  validation?: (
    ...params: Parameters<CreateCw1Whitelist>
  ) => void | Promise<void>
  /**
   * If passed, override the contract label. Defaults to 'Cw1Whitelist'.
   */
  contractLabel?: string
}

export type UseCreateCw1WhitelistReturn = {
  creatingCw1Whitelist: boolean
  createCw1Whitelist: CreateCw1Whitelist
}

export const useCreateCw1Whitelist = ({
  chainId: _chainId,
  validation,
  contractLabel = 'Cw1Whitelist',
}: UseCreateCw1WhitelistOptions = {}) => {
  const { t } = useTranslation()
  const {
    address: walletAddress,
    getSigningClient,
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useWallet({
    chainId: _chainId,
  })
  const cw1WhitelistCodeId =
    getSupportedChainConfig(chainId)?.codeIds?.Cw1Whitelist ?? -1
  const [creatingCw1Whitelist, setCreatingCw1Whitelist] = useState(false)

  const validationRef = useRef(validation)
  validationRef.current = validation
  const createCw1Whitelist: CreateCw1Whitelist = useCallback(
    async (admins: string[], mutable = false) => {
      try {
        if (!walletAddress) {
          throw new Error(t('error.logInToContinue'))
        }

        setCreatingCw1Whitelist(true)

        // Custom validation.
        await validationRef.current?.(admins, mutable)

        if (admins.length < 2) {
          throw new Error(t('error.enterAtLeastTwoAccounts'))
        }
        if (
          admins.some((admin) => !isValidBech32Address(admin, bech32Prefix))
        ) {
          throw new Error(t('error.invalidAccount'))
        }

        const contractAddress = await instantiateSmartContract(
          getSigningClient,
          walletAddress,
          cw1WhitelistCodeId,
          contractLabel,
          {
            admins,
            mutable,
          } as Cw1WhitelistInstantiateMsg
        )

        return contractAddress
      } catch (err) {
        console.error(err)
        toast.error(
          processError(err, {
            forceCapture: false,
          })
        )
      } finally {
        setCreatingCw1Whitelist(false)
      }
    },
    [
      bech32Prefix,
      contractLabel,
      cw1WhitelistCodeId,
      getSigningClient,
      t,
      walletAddress,
    ]
  )

  return {
    creatingCw1Whitelist,
    createCw1Whitelist,
  }
}
