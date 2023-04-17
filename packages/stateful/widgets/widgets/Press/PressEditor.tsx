import { Check } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button, useDaoInfoContext } from '@dao-dao/stateless'
import { WidgetEditorProps } from '@dao-dao/types'
import { InstantiateMsg as Cw721InstantiateMsg } from '@dao-dao/types/contracts/Cw721Base'
import { CODE_ID_CONFIG, processError } from '@dao-dao/utils'

import { PressData } from './types'

export const PressEditor = ({
  fieldNamePrefix,
}: WidgetEditorProps<PressData>) => {
  const { t } = useTranslation()

  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { address: walletAddress = '', signingCosmWasmClient } = useWallet()

  const { setValue, setError, clearErrors, watch } = useFormContext<PressData>()
  const contract = watch((fieldNamePrefix + 'contract') as 'contract')

  const [instantiating, setInstantiating] = useState(false)
  const instantiate = async () => {
    if (!walletAddress || !signingCosmWasmClient) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const name = `${daoName}'s Press`

      const { contractAddress } = await signingCosmWasmClient.instantiate(
        walletAddress,
        CODE_ID_CONFIG.Cw721Base,
        {
          minter: coreAddress,
          name: name,
          symbol: 'PRESS',
        } as Cw721InstantiateMsg,
        name,
        'auto'
      )

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
