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
import { CHAIN_GAS_MULTIPLIER, processError } from '@dao-dao/utils'

import { useWallet } from '../../../hooks/useWallet'
import { PressData } from './types'

export const PressEditor = ({
  fieldNamePrefix,
}: WidgetEditorProps<PressData>) => {
  const { t } = useTranslation()

  const {
    config: { codeIds },
  } = useSupportedChainContext()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { address: walletAddress = '', getSigningCosmWasmClient } = useWallet()

  const { setValue, setError, clearErrors, watch } = useFormContext<PressData>()
  const contract = watch((fieldNamePrefix + 'contract') as 'contract')

  const [instantiating, setInstantiating] = useState(false)
  const instantiate = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    const signingCosmWasmClient = await getSigningCosmWasmClient()

    setInstantiating(true)
    try {
      const name = `${daoName}'s Press`

      const { contractAddress } = codeIds.Cw721Base
        ? await signingCosmWasmClient.instantiate(
            walletAddress,
            codeIds.Cw721Base,
            {
              minter: coreAddress,
              name: name,
              symbol: 'PRESS',
            } as Cw721InstantiateMsg,
            name,
            CHAIN_GAS_MULTIPLIER
          )
        : codeIds.Sg721Base
        ? // TODO(stargaze): test this
          await signingCosmWasmClient.instantiate(
            walletAddress,
            codeIds.Sg721Base,
            {
              collection_info: {
                creator: coreAddress,
                description: `${name} on DAO DAO`,
                image: '',
              },
              minter: coreAddress,
              name: name,
              symbol: 'PRESS',
            } as Sg721InstantiateMsg,
            name,
            CHAIN_GAS_MULTIPLIER
          )
        : { contractAddress: undefined }

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
          ? t('info.createdPressContract')
          : t('info.createPressContract')}
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
