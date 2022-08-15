import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard, ActionComponent } from '@dao-dao/actions'
import { AddressInput, InputErrorMessage, NumberInput } from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

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
    <ActionCard Icon={MintIcon} onRemove={onRemove} title={t('title.mint')}>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
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
            <p className="font-mono text-sm uppercase text-secondary">
              ${govTokenSymbol}
            </p>
          )}
        </div>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <p className="font-mono text-2xl secondary-text">&#10142;</p>
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

export const MintIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.herb')} symbol="🌿" />
}
