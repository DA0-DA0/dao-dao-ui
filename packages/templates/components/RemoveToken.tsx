import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/ui'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import {
  TemplateCard,
  TemplateComponent,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from './common'

interface Token {
  address: string
  info: TokenInfoResponse
}

type RemoveTokenOptions = TokenInfoDisplayProps & {
  existingTokens: Token[]
}

export const RemoveTokenComponent: TemplateComponent<RemoveTokenOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { existingTokens, ...options },
}) => {
  const { register, watch, setValue } = useFormContext()

  const tokenAddress = watch(getLabel('address'))

  const validateIsTreasuryToken = (v: string) =>
    existingTokens.some(({ address }) => address === v) ||
    'This token is not in the DAO treasury.'

  return (
    <TemplateCard
      emoji={<Emoji label="Token" symbol="⭕️" />}
      onRemove={onRemove}
      title="Remove Treasury Token"
    >
      {existingTokens.length > 0 && (
        <>
          <InputLabel name="Existing Tokens" />
          <div className="grid grid-cols-5 gap-1 mb-2">
            {existingTokens.map(({ address, info }) => (
              <Button
                key={address}
                className={clsx('text-center', {
                  'text-secondary bg-transparent': address !== tokenAddress,
                })}
                disabled={readOnly}
                onClick={() => setValue(getLabel('address'), address)}
                size="sm"
                type="button"
                variant="secondary"
              >
                ${info.symbol}
              </Button>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-col gap-2 mb-3">
        <InputLabel name="Token address" />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          label={getLabel('address')}
          register={register}
          validation={[
            validateRequired,
            validateContractAddress,
            validateIsTreasuryToken,
          ]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </TemplateCard>
  )
}
