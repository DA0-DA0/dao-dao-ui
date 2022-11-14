import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  HerbEmoji,
  InputErrorMessage,
  NumberInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard } from '../../../../../actions'

export interface MintOptions {
  govTokenSymbol: string
}

export const MintComponent: ActionComponent<MintOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { govTokenSymbol },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()
  const amount = watch(fieldNamePrefix + 'amount')

  return (
    <ActionCard Icon={HerbEmoji} onRemove={onRemove} title={t('title.mint')}>
      <div className="flex flex-col items-stretch gap-x-3 gap-y-2 sm:flex-row">
        <NumberInput
          containerClassName="grow"
          disabled={!isCreating}
          error={errors?.amount}
          fieldName={fieldNamePrefix + 'amount'}
          onMinus={() =>
            setValue(
              fieldNamePrefix + 'amount',
              (Number(amount) - 1).toString()
            )
          }
          onPlus={() =>
            setValue(
              fieldNamePrefix + 'amount',
              (Number(amount) + 1).toString()
            )
          }
          register={register}
          sizing="fill"
          unit={`$${govTokenSymbol}`}
          validation={[validateRequired, validatePositive]}
        />

        <div className="flex grow flex-row items-stretch gap-2 sm:gap-3">
          <div className="flex flex-row items-center pl-1 sm:pl-0">
            <ArrowRightAltRounded className="!hidden !h-6 !w-6 text-text-secondary sm:!block" />
            <SubdirectoryArrowRightRounded className="!h-4 !w-4 text-text-secondary sm:!hidden" />
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

      <InputErrorMessage error={errors?.amount} />
      <InputErrorMessage error={errors?.to} />
    </ActionCard>
  )
}
