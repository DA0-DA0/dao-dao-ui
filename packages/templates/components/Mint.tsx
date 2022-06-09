import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, NumberInput } from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { TemplateCard, TemplateComponent } from './common'

export interface MintOptions {
  govTokenSymbol: string
}

export const MintComponent: TemplateComponent<MintOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { govTokenSymbol },
}) => {
  const { register, watch, setValue } = useFormContext()
  const amount = watch(getLabel('amount'))

  return (
    <TemplateCard
      emoji={<Emoji label="Herb" symbol="🌿" />}
      onRemove={onRemove}
      title="Mint"
    >
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
          <div>
            <NumberInput
              disabled={readOnly}
              error={errors?.amount}
              label={getLabel('amount')}
              onPlusMinus={[
                () =>
                  setValue(getLabel('amount'), (Number(amount) + 1).toString()),
                () =>
                  setValue(getLabel('amount'), (Number(amount) - 1).toString()),
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
        <p className="font-mono text-2xl secondary-text">&#10142;</p>
        <div className="grow">
          <AddressInput
            containerClassName="grow"
            disabled={readOnly}
            error={errors?.to}
            label={getLabel('to')}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.to} />
        </div>
      </div>
    </TemplateCard>
  )
}
