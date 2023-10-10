import { Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { WidgetEditorProps } from '@dao-dao/types'
import { InstantiateMsg as Cw721InstantiateMsg } from '@dao-dao/types/contracts/Cw721Base'
import { InstantiateMsg as Sg721InstantiateMsg } from '@dao-dao/types/contracts/Sg721Base'
import { instantiateSmartContract, processError } from '@dao-dao/utils'

import { useWallet } from '../../../hooks/useWallet'
import { WrapprData } from './types'

export const WrapprEditor = ({
  fieldNamePrefix,
}: WidgetEditorProps<WrapprData>) => {
  const { t } = useTranslation()

  const {
    config: { codeIds },
  } = useSupportedChainContext()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { address: walletAddress = '', getSigningCosmWasmClient } = useWallet()

  const { setValue, setError, clearErrors, watch } = useFormContext<WrapprData>()
  const contract = watch((fieldNamePrefix + 'contract') as 'contract')

  // TODO: Modify for IBC call to Wrappr.sol
  const [instantiating, setInstantiating] = useState(false)
  const instantiate = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    const signingCosmWasmClient = await getSigningCosmWasmClient()

    setInstantiating(true)
    try {
      const name = `${daoName}'s Wrappr`

      const contractAddress = codeIds.Cw721Base
        ? await instantiateSmartContract(
            signingCosmWasmClient,
            walletAddress,
            codeIds.Cw721Base,
            name,
            {
              minter: coreAddress,
              name: name,
              symbol: 'WRAPPR',
            } as Cw721InstantiateMsg
          )
        : codeIds.Sg721Base
        ? // TODO(stargaze): test this
          await instantiateSmartContract(
            signingCosmWasmClient,
            walletAddress,
            codeIds.Sg721Base,
            name,
            {
              collection_info: {
                creator: coreAddress,
                description: `${name} on DAO DAO`,
                image: '',
              },
              minter: coreAddress,
              name: name,
              symbol: 'WRAPPR',
            } as Sg721InstantiateMsg
          )
        : undefined

      // Should never happen.
      if (!contractAddress) {
        throw new Error(t('error.loadingData'))
      }

      setValue((fieldNamePrefix + 'contract') as 'contract', contractAddress)

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  // Prevent action from being submitted if the contract has not yet been
  // created.
  useEffect(() => {
    if (!contract) {
      setError((fieldNamePrefix + 'contract') as 'contract', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'contract') as 'contract')
    }
  }, [setError, clearErrors, t, contract, fieldNamePrefix])

  return (
    <div className="mt-2 flex flex-row flex-wrap items-center gap-2">
      <p className="body-text break-words">
        {contract
          ? t('info.createdWrapprContract')
          : t('info.createWrapprContract')}
      </p>

      {contract ? (
        <Check className="!h-6 !w-6" />
      ) : (
        <Button loading={instantiating} onClick={instantiate} variant="primary">
          {t('button.create')}
        </Button>
      )}
    </div>
  )
}
