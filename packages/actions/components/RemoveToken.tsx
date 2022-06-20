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
      emoji={<Emoji label={t('token')} symbol="⭕️" />}
      onRemove={onRemove}
      title={t('removeTreasuryToken')}
    >
      {existingTokens.length > 0 && (
        <>
          <InputLabel name={t('existingTokens')} />
          <div className="grid grid-cols-5 gap-1 mb-2">
            {existingTokens.map(({ address, info }) => (
              <Button
                key={address}
                className={clsx('text-center', {
                  'text-secondary bg-transparent': address !== tokenAddress,
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

      <div className="flex flex-col gap-2 mb-3">
        <InputLabel name={t('tokenAddress')} />
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
