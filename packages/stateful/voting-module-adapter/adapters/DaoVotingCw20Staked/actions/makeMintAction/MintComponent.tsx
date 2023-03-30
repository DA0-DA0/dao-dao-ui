import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  InputErrorMessage,
  NumberInput,
  useDetectWrap,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  GenericToken,
} from '@dao-dao/types'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export interface MintOptions {
  govToken: GenericToken
  // Used to display the profile of the address receiving minted tokens.
  AddressInput: ComponentType<AddressInputProps>
}

export const MintComponent: ActionComponent<MintOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { govToken, AddressInput },
}) => {
  const { register, watch, setValue } = useFormContext()

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <>
      <div
        className="flex flex-row flex-wrap items-stretch gap-x-3 gap-y-2"
        ref={containerRef}
      >
        <NumberInput
          containerClassName="w-full sm:w-auto"
          disabled={!isCreating}
          error={errors?.amount}
          fieldName={fieldNamePrefix + 'amount'}
          min={1 / 10 ** govToken.decimals}
          register={register}
          setValue={setValue}
          sizing="none"
          step={1 / 10 ** govToken.decimals}
          unit={'$' + govToken.symbol}
          validation={[validateRequired, validatePositive]}
          watch={watch}
        />

        <div
          className="flex grow flex-row items-stretch gap-2 sm:gap-3"
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
            error={errors?.to}
            fieldName={fieldNamePrefix + 'to'}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
        </div>
      </div>

      {(errors?.amount || errors?.to) && (
        <div className="-mt-2 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.to} />
        </div>
      )}
    </>
  )
}
