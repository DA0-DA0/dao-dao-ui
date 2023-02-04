import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  convertMicroDenomToDenomWithDecimals,
  isValidAddress,
  nativeTokenLabel,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { InstantiateTokenSwapOptions } from './types'

// Form displayed when the user is instantiating a new token swap.
export const InstantiateTokenSwap: ActionComponent<
  InstantiateTokenSwapOptions
> = ({
  fieldNamePrefix,
  errors,
  options: {
    selfPartyTokenBalances,
    counterpartyTokenBalances,
    onInstantiate,
    instantiating,
    AddressInput,
    Trans,
  },
}) => {
  const { t } = useTranslation()

  const { register, watch, setValue, trigger } = useFormContext()

  const selfParty = watch(fieldNamePrefix + 'selfParty')
  const counterparty = watch(fieldNamePrefix + 'counterparty')

  const selfToken = selfPartyTokenBalances.find(
    ({ token }) => selfParty.denomOrAddress === token.denomOrAddress
  )
  const selfDecimals = selfToken?.token.decimals ?? 0
  const selfMin = convertMicroDenomToDenomWithDecimals(1, selfDecimals)
  const selfMax = convertMicroDenomToDenomWithDecimals(
    selfToken?.balance ?? 0,
    selfDecimals
  )
  const selfSymbol =
    selfToken?.token.symbol ?? nativeTokenLabel(selfParty.denomOrAddress)

  const counterpartyToken = counterpartyTokenBalances.loading
    ? undefined
    : counterpartyTokenBalances.data.find(
        ({ token }) => counterparty.denomOrAddress === token.denomOrAddress
      )
  const counterpartyDecimals = counterpartyToken?.token.decimals ?? 0
  const counterpartyMin = convertMicroDenomToDenomWithDecimals(
    1,
    counterpartyDecimals
  )
  const counterpartyMax = convertMicroDenomToDenomWithDecimals(
    counterpartyToken?.balance ?? 0,
    counterpartyDecimals
  )
  const counterpartySymbol = counterpartyToken?.token.symbol

  const counterpartyAddressValid =
    !!counterparty.address &&
    isValidAddress(counterparty.address, CHAIN_BECH32_PREFIX)

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose">
        <Trans i18nKey="form.tokenSwapCreateInstructions">
          In this step, you will create the token swap. This creation step
          describes how many funds each party needs to send for the swap to
          complete.{' '}
          <span className="font-bold underline">
            No funds will be transferred at this time.
          </span>
        </Trans>
      </p>

      <div className="space-y-2">
        <InputLabel name={t('form.whoIsCounterparty')} />

        <AddressInput
          error={errors?.counterparty?.address}
          fieldName={fieldNamePrefix + 'counterparty.address'}
          register={register}
          validation={[validateRequired, validateAddress]}
        />

        <InputErrorMessage error={errors?.counterparty?.address} />
      </div>

      <div className="space-y-2">
        <InputLabel>
          <Trans i18nKey="form.whatReceiveCounterpartyQuestion">
            What do you need to{' '}
            <span className="font-bold underline">receive</span> from the
            counterparty for the token swap to complete?
          </Trans>
        </InputLabel>

        <div className="flex flex-row items-stretch gap-2">
          {/* Allow to enter value for counterparty greater than what they currently have in the treasury, since they could accept it at a future time when they do have the amount. */}
          <NumberInput
            containerClassName="grow"
            error={errors?.counterparty?.amount}
            fieldName={fieldNamePrefix + 'counterparty.amount'}
            min={counterpartyMin}
            register={register}
            setValue={setValue}
            sizing="auto"
            step={counterpartyMin}
            validation={[validateRequired, validatePositive]}
            watch={watch}
          />

          <SelectInput
            className={
              counterpartyTokenBalances.loading ? 'animate-pulse' : undefined
            }
            disabled={
              !counterpartyAddressValid || counterpartyTokenBalances.loading
            }
            error={errors?.counterparty?.denomOrAddress}
            fieldName={fieldNamePrefix + 'counterparty.denomOrAddress'}
            onChange={(denomOrAddress) => {
              if (counterpartyTokenBalances.loading) {
                return
              }

              const foundToken = counterpartyTokenBalances.data.find(
                ({ token }) => denomOrAddress === token.denomOrAddress
              )
              if (!foundToken) {
                return
              }

              // Update type and decimals.
              setValue(
                fieldNamePrefix + 'counterparty.type',
                foundToken.token.type
              )
              setValue(
                fieldNamePrefix + 'counterparty.decimals',
                foundToken.token.decimals
              )
            }}
            register={register}
            style={{ maxWidth: '8.2rem' }}
          >
            {!counterpartyTokenBalances.loading &&
              counterpartyTokenBalances.data.map(
                ({ token: { denomOrAddress, symbol } }) => (
                  <option key={denomOrAddress} value={denomOrAddress}>
                    ${symbol}
                  </option>
                )
              )}
          </SelectInput>
        </div>

        {/* Warn if counterparty does not have the requested amount. */}
        {counterparty.amount > counterpartyMax && (
          <p className="caption-text text-text-interactive-warning-body">
            {t('error.counterpartyBalanceInsufficient', {
              amount: counterpartyMax.toLocaleString(undefined, {
                maximumFractionDigits: counterpartyDecimals,
              }),
              tokenSymbol: counterpartySymbol,
            })}
          </p>
        )}

        <InputErrorMessage error={errors?.counterparty?.amount} />
        <InputErrorMessage error={errors?.counterparty?.denomOrAddress} />
      </div>

      <div className="space-y-2">
        <InputLabel>
          <Trans i18nKey="form.whatSendCounterpartyQuestion">
            What do you need to{' '}
            <span className="font-bold underline">send</span> to the
            counterparty for the token swap to complete?
          </Trans>
        </InputLabel>

        <div className="flex flex-row items-stretch gap-2">
          <NumberInput
            containerClassName="grow"
            error={errors?.selfParty?.amount}
            fieldName={fieldNamePrefix + 'selfParty.amount'}
            max={selfMax}
            min={selfMin}
            register={register}
            setValue={setValue}
            sizing="auto"
            step={selfMin}
            validation={[
              validateRequired,
              validatePositive,
              (value) =>
                value <= selfMax ||
                t('error.treasuryInsufficient', {
                  amount: selfMax.toLocaleString(undefined, {
                    maximumFractionDigits: selfDecimals,
                  }),
                  tokenSymbol: selfSymbol,
                }),
            ]}
            watch={watch}
          />

          <SelectInput
            error={errors?.selfParty?.denomOrAddress}
            fieldName={fieldNamePrefix + 'selfParty.denomOrAddress'}
            onChange={(denomOrAddress) => {
              const foundToken = selfPartyTokenBalances.find(
                ({ token }) => denomOrAddress === token.denomOrAddress
              )
              if (!foundToken) {
                return
              }

              // Update type and decimals.
              setValue(
                fieldNamePrefix + 'selfParty.type',
                foundToken.token.type
              )
              setValue(
                fieldNamePrefix + 'selfParty.decimals',
                foundToken.token.decimals
              )
            }}
            register={register}
            style={{ maxWidth: '8.2rem' }}
          >
            {selfPartyTokenBalances.map(
              ({ token: { denomOrAddress, symbol } }) => (
                <option key={denomOrAddress} value={denomOrAddress}>
                  ${symbol}
                </option>
              )
            )}
          </SelectInput>
        </div>

        <InputErrorMessage error={errors?.selfParty?.amount} />
        <InputErrorMessage error={errors?.selfParty?.denomOrAddress} />
      </div>

      <Button
        className="self-end"
        loading={instantiating}
        onClick={async () => {
          // Manually validate just the instantiation fields.
          const valid = await trigger([
            fieldNamePrefix + 'selfParty',
            fieldNamePrefix + 'counterparty',
          ])
          valid && onInstantiate()
        }}
        size="lg"
      >
        {t('button.create')}
      </Button>
    </div>
  )
}
