import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  InputLabel,
  NumberInput,
  useChain,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  GenericToken,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type UpdateMinterAllowanceData = {
  minter: string
  allowance: number
}

export type UpdateMinterAllowanceOptions = {
  govToken: GenericToken
  AddressInput: ComponentType<AddressInputProps<UpdateMinterAllowanceData>>
}

export const UpdateMinterAllowanceComponent: ActionComponent<
  UpdateMinterAllowanceOptions
> = ({ fieldNamePrefix, errors, options: { govToken, AddressInput } }) => {
  const { t } = useTranslation()
  const { register, watch, setValue } =
    useFormContext<UpdateMinterAllowanceData>()
  const { bech32_prefix: bech32Prefix } = useChain()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.updateMinterAllowanceExplanation')}
      </p>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.minter')} />
        <AddressInput
          // This action is only programmatically used when minting tokens, so
          // always disable the inputs.
          disabled
          error={errors?.minter}
          fieldName={(fieldNamePrefix + 'minter') as 'minter'}
          register={register}
          setValue={setValue}
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          watch={watch}
        />
        <InputErrorMessage error={errors?.minter} />
      </div>

      <div className="flex flex-col gap-1 self-start">
        <InputLabel
          name={t('form.howManyTokensCanTheyMint', {
            tokenSymbol: govToken.symbol,
          })}
        />
        <NumberInput
          // This action is only programmatically used when minting tokens, so
          // always disable the inputs.
          disabled
          error={errors?.amount}
          fieldName={(fieldNamePrefix + 'allowance') as 'allowance'}
          min={convertMicroDenomToDenomWithDecimals(1, govToken.decimals)}
          register={register}
          setValue={setValue}
          step={convertMicroDenomToDenomWithDecimals(1, govToken.decimals)}
          unit={'$' + govToken.symbol}
          validation={[validateRequired, validatePositive]}
          watch={watch}
        />
        <InputErrorMessage error={errors?.minter} />
      </div>
    </>
  )
}
