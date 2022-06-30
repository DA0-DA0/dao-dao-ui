import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from '@dao-dao/ui'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

interface Token {
  address: string
  info: TokenInfoResponse
}

type RemoveTokenOptions = TokenInfoDisplayProps & {
  existingTokens: Token[]
}

export const RemoveTokenComponent: ActionComponent<RemoveTokenOptions> = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
  options: { existingTokens, ...options },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  const tokenAddress = watch(getFieldName('address'))

  const validateIsTreasuryToken = (v: string) =>
    existingTokens.some(({ address }) => address === v) ||
    'This token is not in the treasury.'

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.token')} symbol="⭕️" />}
      onRemove={onRemove}
      title={t('title.removeTreasuryToken')}
    >
      {existingTokens.length > 0 && (
        <>
          <InputLabel name={t('form.existingTokens')} />
          <div className="mb-2 grid grid-cols-5 gap-1">
            {existingTokens.map(({ address, info }) => (
              <Button
                key={address}
                className={clsx('text-center', {
                  'bg-transparent text-secondary': address !== tokenAddress,
                })}
                disabled={readOnly}
                onClick={() => setValue(getFieldName('address'), address)}
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

      <div className="mb-3 flex flex-col gap-2">
        <InputLabel name={t('form.tokenAddress')} />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          fieldName={getFieldName('address')}
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
    </ActionCard>
  )
}
