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
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <div>
            <NumberInput
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
              sizing="auto"
              validation={[validateRequired, validatePositive]}
            />
            <InputErrorMessage error={errors?.amount} />
          </div>
          {govTokenSymbol && (
            <p className="font-mono text-sm uppercase text-text-secondary">
              ${govTokenSymbol}
            </p>
          )}
        </div>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <p className="secondary-text font-mono text-2xl">&#10142;</p>
        <div className="grow">
          <AddressInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.to}
            fieldName={fieldNamePrefix + 'to'}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.to} />
        </div>
      </div>
    </ActionCard>
  )
}
