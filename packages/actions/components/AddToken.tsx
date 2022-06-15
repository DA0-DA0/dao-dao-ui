import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from '@dao-dao/ui'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { ActionCard, ActionComponent } from '..'

export const AddTokenComponent: ActionComponent<TokenInfoDisplayProps> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options,
}) => {
  const { register } = useFormContext()

  return (
    <ActionCard
      emoji={<Emoji label="Token" symbol="🔘" />}
      onRemove={onRemove}
      title="Add Treasury Token"
    >
      <div className="flex flex-col gap-2">
        <InputLabel name="Token address" />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          label={getLabel('address')}
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </ActionCard>
  )
}
