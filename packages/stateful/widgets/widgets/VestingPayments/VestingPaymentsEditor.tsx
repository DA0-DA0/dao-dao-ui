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
import { InstantiateMsg as VestingFactoryInstantiateMsg } from '@dao-dao/types/contracts/CwPayrollFactory'
import { instantiateSmartContract, processError } from '@dao-dao/utils'

import { useWallet } from '../../../hooks/useWallet'
import { VestingPaymentsData } from './types'

export const VestingPaymentsEditor = ({
  fieldNamePrefix,
}: WidgetEditorProps<VestingPaymentsData>) => {
  const { t } = useTranslation()

  const { name, coreAddress } = useDaoInfoContext()
  const {
    config: { codeIds },
  } = useSupportedChainContext()
  const { address: walletAddress = '', getSigningCosmWasmClient } = useWallet()

  const { setValue, setError, clearErrors, watch } =
    useFormContext<VestingPaymentsData>()
  const factory = watch((fieldNamePrefix + 'factory') as 'factory')

  const [instantiating, setInstantiating] = useState(false)
  const instantiateVestingFactory = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const contractAddress = await instantiateSmartContract(
        await getSigningCosmWasmClient(),
        walletAddress,
        codeIds.CwPayrollFactory,
        `DAO_${name}_VestingPayrollFactory`,
        {
          owner: coreAddress,
          vesting_code_id: codeIds.CwVesting,
        } as VestingFactoryInstantiateMsg
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
