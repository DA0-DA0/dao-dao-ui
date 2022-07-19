import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
    <ActionCard Icon={MintIcon} onRemove={onRemove} title={t('title.mint')}>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
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
            <p className="font-mono text-sm text-secondary uppercase">
              ${govTokenSymbol}
            </p>
          )}
        </div>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <p className="font-mono text-2xl secondary-text">&#10142;</p>
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

export const MintIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.herb')} symbol="🌿" />
}
