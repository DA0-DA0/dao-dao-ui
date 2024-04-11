import { Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyableAddress,
  DaoSupportedChainPickerInput,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { ActionKey, ChainId, WidgetEditorProps } from '@dao-dao/types'
import { InstantiateMsg as Cw721InstantiateMsg } from '@dao-dao/types/contracts/Cw721Base'
import {
  getChainAddressForActionOptions,
  getSupportedChainConfig,
  instantiateSmartContract,
  processError,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../actions'
import { ConnectWallet } from '../../../components/ConnectWallet'
import { useWallet } from '../../../hooks/useWallet'
import { PressData } from './types'

export const PressEditor = ({
  remove,
  addAction,
  fieldNamePrefix,
  isCreating,
}: WidgetEditorProps<PressData>) => {
  const { t } = useTranslation()

  const actionOptions = useActionOptions()

  const {
    config: { polytone },
  } = useSupportedChainContext()
  const {
    name: daoName,
    chainId: daoChainId,
    polytoneProxies,
  } = useDaoInfoContext()

  const { setValue, setError, clearErrors, watch } = useFormContext<PressData>()
  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const contract = watch((fieldNamePrefix + 'contract') as 'contract')

  // Auto-select valid chain ID if undefined.
  useEffect(() => {
    const defaultChainId =
      daoChainId === ChainId.StargazeMainnet
        ? Object.keys(polytoneProxies)[0]
        : daoChainId
    if (!chainId && defaultChainId) {
      setValue((fieldNamePrefix + 'chainId') as 'chainId', defaultChainId)
    }
  }, [chainId, daoChainId, setValue, fieldNamePrefix, polytoneProxies])

  const {
    address: walletAddress = '',
    getSigningClient,
    chain,
  } = useWallet({
    chainId,
  })

  const [instantiating, setInstantiating] = useState(false)
  const instantiate = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }
    if (!chainId) {
      toast.error(t('error.selectAChainToContinue'))
      return
    }
    const minter = getChainAddressForActionOptions(actionOptions, chainId)
    if (!minter) {
      toast.error(t('error.addressNotFoundOnChain'))
      return
    }

    setInstantiating(true)
    try {
      const codeId = getSupportedChainConfig(chainId)?.codeIds?.Cw721Base

      const name = `${daoName}'s Press`
      const contractAddress = codeId
        ? await instantiateSmartContract(
            getSigningClient,
            walletAddress,
            codeId,
            name,
            {
              minter,
              name: name,
              symbol: 'PRESS',
            } as Cw721InstantiateMsg
          )
        : undefined

      // Should never happen.
      if (!contractAddress) {
        throw new Error(t('error.loadingData'))
      }

      setValue((fieldNamePrefix + 'chainId') as 'chainId', chain.chain_id)
      setValue((fieldNamePrefix + 'contract') as 'contract', contractAddress)

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  // Prevent action from being submitted if the chain ID has not yet been set or
  // the contract has not yet been created.
  useEffect(() => {
    if (!chainId || !contract) {
      setError((fieldNamePrefix + 'contract') as 'contract', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'contract') as 'contract')
    }
  }, [setError, clearErrors, t, contract, fieldNamePrefix, chainId])

  const stargazeDaoNoCrossChainAccounts =
    (daoChainId === ChainId.StargazeMainnet ||
      daoChainId === ChainId.StargazeTestnet) &&
    !Object.keys(polytoneProxies).length

  return (
    <div className="mt-2 flex flex-col items-start gap-4">
      {/* If DAO on Stargaze and has no cross-chain accounts, show error. */}
      {isCreating && stargazeDaoNoCrossChainAccounts ? (
        <>
          <p className="secondary-text max-w-prose text-text-interactive-error">
            {t('error.stargazeDaoNoCrossChainAccountsForPress')}
          </p>

          {remove && addAction && (
            <Button
              onClick={() => {
                remove?.()
                addAction?.({
                  actionKey: ActionKey.CreateCrossChainAccount,
                  data: {
                    chainId: Object.keys(polytone || {})[0],
                  },
                })
              }}
            >
              {t('button.createCrossChainAccount')}
            </Button>
          )}
        </>
      ) : (
        <>
          <p className="primary-text">{t('title.chain')}</p>
          <p className="secondary-text -mt-3 max-w-prose break-words">
            {t('info.selectPressChain')}
          </p>

          <DaoSupportedChainPickerInput
            disabled={!isCreating || !!contract}
            excludeChainIds={
              // NFTs on Stargaze work differently, so we can't create Presses
              // directly on it. To use Press with a Stargaze DAO, the DAO needs
              // a cross-chain account on another chain.
              [ChainId.StargazeMainnet, ChainId.StargazeTestnet]
            }
            fieldName={fieldNamePrefix + 'chainId'}
            hideFormLabel
            onlyDaoChainIds
          />

          <div className="flex flex-row flex-wrap items-center gap-2">
            <p className="body-text max-w-prose break-words">
              {contract
                ? t('info.createdPressContract')
                : t('info.createPressContract')}
            </p>

            {contract && <Check className="!h-6 !w-6" />}
          </div>

          {contract ? (
            <CopyableAddress address={contract} className="!w-auto" />
          ) : walletAddress ? (
            <Button
              loading={instantiating}
              onClick={instantiate}
              variant="primary"
            >
              {t('button.create')}
            </Button>
          ) : (
            <ConnectWallet size="md" />
          )}
        </>
      )}
    </div>
  )
}
