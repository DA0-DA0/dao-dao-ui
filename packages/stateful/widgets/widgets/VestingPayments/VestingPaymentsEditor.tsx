import { Check } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button, useDaoInfoContext } from '@dao-dao/stateless'
import { WidgetEditorProps } from '@dao-dao/types'
import { InstantiateMsg as VestingFactoryInstantiateMsg } from '@dao-dao/types/contracts/CwPayrollFactory'
import { CODE_ID_CONFIG, processError } from '@dao-dao/utils'

import { VestingPaymentsData } from './types'

export const VestingPaymentsEditor = ({
  fieldNamePrefix,
}: WidgetEditorProps<VestingPaymentsData>) => {
  const { t } = useTranslation()

  const { name, coreAddress } = useDaoInfoContext()
  const { address: walletAddress = '', signingCosmWasmClient } = useWallet()

  const { setValue, setError, clearErrors, watch } =
    useFormContext<VestingPaymentsData>()
  const factory = watch((fieldNamePrefix + 'factory') as 'factory')

  const [instantiating, setInstantiating] = useState(false)
  const instantiateVestingFactory = async () => {
    if (!walletAddress || !signingCosmWasmClient) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const { contractAddress } = await signingCosmWasmClient.instantiate(
        walletAddress,
        CODE_ID_CONFIG.CwPayrollFactory,
        {
          owner: coreAddress,
          vesting_code_id: CODE_ID_CONFIG.CwVesting,
        } as VestingFactoryInstantiateMsg,
        `DAO_${name}_VestingPayrollFactory`,
        'auto'
      )

      setValue((fieldNamePrefix + 'factory') as 'factory', contractAddress)

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  // Prevent action from being submitted if the vesting factory contract has not
  // yet been created.
  useEffect(() => {
    if (!factory) {
      setError((fieldNamePrefix + 'factory') as 'factory', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'factory') as 'factory')
    }
  }, [setError, clearErrors, t, factory, fieldNamePrefix])

  return (
    <div className="mt-2 flex flex-row flex-wrap items-center gap-2">
      <p className="body-text break-words">
        {factory
          ? t('info.createdVestingContractManager')
          : t('info.createVestingContractManager')}
      </p>

      {factory ? (
        <Check className="!h-6 !w-6" />
      ) : (
        <Button
          loading={instantiating}
          onClick={instantiateVestingFactory}
          variant="primary"
        >
          {t('button.create')}
        </Button>
      )}
    </div>
  )
}
