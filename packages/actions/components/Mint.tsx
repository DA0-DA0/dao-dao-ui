import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import { AddressInput, InputErrorMessage, NumberInput } from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export interface MintOptions {
  govTokenSymbol: string
}

export const MintComponent: ActionComponent<MintOptions> = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
  options: { govTokenSymbol },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()
  const amount = watch(getFieldName('amount'))

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.herb')} symbol="🌿" />}
      onRemove={onRemove}
      title={t('title.mint')}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <div>
            <NumberInput
              disabled={readOnly}
              error={errors?.amount}
              fieldName={getFieldName('amount')}
              onPlusMinus={[
                () =>
                  setValue(
                    getFieldName('amount'),
                    (Number(amount) + 1).toString()
                  ),
                () =>
                  setValue(
                    getFieldName('amount'),
                    (Number(amount) - 1).toString()
                  ),
              ]}
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
        <p className="secondary-text font-mono text-2xl">&#10142;</p>
        <div className="grow">
          <AddressInput
            containerClassName="grow"
            disabled={readOnly}
            error={errors?.to}
            fieldName={getFieldName('to')}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.to} />
        </div>
      </div>
    </ActionCard>
  )
}
