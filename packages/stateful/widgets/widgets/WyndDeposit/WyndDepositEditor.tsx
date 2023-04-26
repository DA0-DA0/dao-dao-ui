import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { genericTokenSelector, wyndPoolsSelector } from '@dao-dao/state/recoil'
import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  TokenInput,
  useCachedLoadable,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TokenType, WidgetEditorProps, WyndPoolToken } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  validateAddress,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../actions'
import { EntityDisplay } from '../../../components'
import { WyndDepositData } from './types'

export const WyndDepositEditor = ({
  fieldNamePrefix,
  isCreating,
  errors,
}: WidgetEditorProps<WyndDepositData>) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  const { watch, register, setValue } = useFormContext<WyndDepositData>()
  const outputToken = watch((fieldNamePrefix + 'outputToken') as 'outputToken')

  const wyndPoolsLoadable = useCachedLoadable(wyndPoolsSelector)
  if (wyndPoolsLoadable.state === 'hasError') {
    throw wyndPoolsLoadable.contents
  }
  const wyndPools =
    wyndPoolsLoadable.state !== 'hasValue'
      ? undefined
      : wyndPoolsLoadable.contents
  const uniqueWyndPoolTokens = Object.values(
    Object.values(wyndPools ?? {})
      .flat()
      .reduce(
        (acc, token) => ({
          ...acc,
          // Ignore amount when comparing tokens.
          [JSON.stringify({ ...token, amount: '0' })]: token,
        }),
        {} as Record<string, WyndPoolToken>
      )
  )
  const loadingWyndTokens = useCachedLoading(
    uniqueWyndPoolTokens.length > 0
      ? waitForAll(
          uniqueWyndPoolTokens.map((token) =>
            genericTokenSelector({
              chainId,
              type: 'native' in token ? TokenType.Native : TokenType.Cw20,
              denomOrAddress: 'native' in token ? token.native : token.token,
            })
          )
        )
      : undefined,
    []
  )

  const selectedOutputToken =
    loadingWyndTokens.loading || !outputToken
      ? undefined
      : loadingWyndTokens.data.find(
          (token) =>
            token.type === outputToken.type &&
            token.denomOrAddress === outputToken.denomOrAddress
        )

  return (
    <>
      <div className="space-y-1">
        <InputLabel name={t('form.outputToken')} />

        <TokenInput
          amountError={errors?.outputAmount}
          amountFieldName={(fieldNamePrefix + 'outputAmount') as 'outputAmount'}
          amountMin={convertMicroDenomToDenomWithDecimals(
            1,
            selectedOutputToken?.decimals ?? 0
          )}
          amountStep={convertMicroDenomToDenomWithDecimals(
            1,
            selectedOutputToken?.decimals ?? 0
          )}
          convertMicroDenom
          disabled={!isCreating}
          onSelectToken={({ type, denomOrAddress }) => {
            // Update type, denomOrAddress, and decimals.
            setValue((fieldNamePrefix + 'outputToken') as 'outputToken', {
              type,
              denomOrAddress,
            })
          }}
          register={register}
          selectedToken={selectedOutputToken}
          setValue={setValue}
          tokens={loadingWyndTokens}
          watch={watch}
        />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.description')}>
          <span className="text-text-tertiary">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {' – '}
            {t('info.supportsMarkdownFormat')}
          </span>
        </InputLabel>

        <TextAreaInput
          disabled={!isCreating}
          error={errors?.markdown}
          fieldName={(fieldNamePrefix + 'markdown') as 'markdown'}
          register={register}
          rows={10}
        />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.recipient')} optional />
        <AddressInput
          EntityDisplay={EntityDisplay}
          disabled={!isCreating}
          error={errors?.outputAddress}
          fieldName={(fieldNamePrefix + 'outputAddress') as 'outputAddress'}
          placeholder={t('title.daoTreasury')}
          register={register}
          validation={[(v) => validateAddress(v, false)]}
        />
        <InputErrorMessage error={errors?.outputAddress} />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.buttonLabel')} optional />
        <TextInput
          disabled={!isCreating}
          error={errors?.buttonLabel}
          fieldName={(fieldNamePrefix + 'buttonLabel') as 'buttonLabel'}
          placeholder={
            // Default
            t('button.deposit')
          }
          register={register}
        />
        <InputErrorMessage error={errors?.buttonLabel} />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.tokenInstructions')} optional />
        <TextInput
          disabled={!isCreating}
          error={errors?.tokenInstructions}
          fieldName={
            (fieldNamePrefix + 'tokenInstructions') as 'tokenInstructions'
          }
          placeholder={
            // Default
            t('info.chooseTokenToPayWith') + '...'
          }
          register={register}
        />
        <InputErrorMessage error={errors?.tokenInstructions} />
      </div>
    </>
  )
}
