import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionComponent, StatefulEntityDisplayProps } from '@dao-dao/types'
import { VestingPayment } from '@dao-dao/types/contracts/CwVesting'

export type CancelVestingData = {
  address: string
}

export type CancelVestingOptions = {
  vestingContracts: ({ address: string } & VestingPayment)[]
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const CancelVesting: ActionComponent<CancelVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { vestingContracts, EntityDisplay },
}) => {
  const { t } = useTranslation()

  const { register, watch, setValue } = useFormContext()
  const watchAddress = watch(fieldNamePrefix + 'address')

  const selectedVesting = vestingContracts.find(
    ({ address }) => address === watchAddress
  )

  return <div className="flex flex-col gap-4"></div>
}
