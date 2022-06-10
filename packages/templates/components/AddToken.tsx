import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { TemplateComponent } from './common'
import { TemplateCard } from './TemplateCard'
import { TokenInfoDisplayProps, TokenInfoDisplay } from './TokenInfoDisplay'

export const AddTokenComponent: TemplateComponent<TokenInfoDisplayProps> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options,
}) => {
  const { register } = useFormContext()

  return (
    <TemplateCard
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
    </TemplateCard>
  )
}
