import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  InputErrorMessage,
  NumericInput,
  StatusCard,
  useChain,
  useDetectWrap,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  GenericToken,
} from '@dao-dao/types'
import {
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type MintData = {
  recipient: string
  amount: string
}

export type MintOptions = {
  govToken: GenericToken
  AddressInput: ComponentType<AddressInputProps<MintData>>
}

export const MintComponent: ActionComponent<MintOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { govToken, AddressInput },
}) => {
  const { t } = useTranslation()
  const { register, setValue, getValues } = useFormContext<MintData>()
  const { bech32_prefix: bech32Prefix } = useChain()

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <>
      <StatusCard
        className="max-w-prose"
        content={t('info.mintExplanation')}
        style="warning"
      />

      <div
        className="flex min-w-0 flex-row flex-wrap items-stretch justify-between gap-x-3 gap-y-1"
        ref={containerRef}
      >
        <NumericInput
          disabled={!isCreating}
          error={errors?.amount}
          fieldName={(fieldNamePrefix + 'amount') as 'amount'}
          getValues={getValues}
          min={HugeDecimal.one.toHumanReadableNumber(govToken.decimals)}
          register={register}
          setValue={setValue}
          step={HugeDecimal.one.toHumanReadableNumber(govToken.decimals)}
          unit={'$' + govToken.symbol}
          validation={[validateRequired, validatePositive]}
        />

        <div
          className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3"
          ref={childRef}
        >
          <div
            className={clsx('flex flex-row items-center', wrapped && 'pl-1')}
          >
            <Icon className="!h-6 !w-6 text-text-secondary" />
          </div>

          <AddressInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.recipient}
            fieldName={(fieldNamePrefix + 'recipient') as 'recipient'}
            register={register}
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
        </div>
      </div>

      {(errors?.amount || errors?.recipient) && (
        <div className="-mt-4 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.recipient} />
        </div>
      )}
    </>
  )
}
