import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel, useChain } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress } from '@dao-dao/utils'

export type DeauthorizeVoterData = {
  chainId: string
  voter: string
  // Whether or not this chain uses the v1 governance module.
  v1: boolean | undefined
}

export type DeauthorizeVoterOptions = {
  AddressInput: ComponentType<AddressInputProps<DeauthorizeVoterData>>
}

export const DeauthorizeVoterComponent: ActionComponent<
  DeauthorizeVoterOptions
> = ({ fieldNamePrefix, errors, isCreating, options: { AddressInput } }) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()

  const { register } = useFormContext<DeauthorizeVoterData>()

  return (
    <div className="flex flex-col gap-1">
      <InputLabel name={t('form.voter')} />

      <AddressInput
        disabled={!isCreating}
        error={errors?.voter}
        fieldName={(fieldNamePrefix + 'voter') as 'voter'}
        register={register}
        validation={[makeValidateAddress(bech32Prefix)]}
      />

      <InputErrorMessage error={errors?.voter} />
    </div>
  )
}
