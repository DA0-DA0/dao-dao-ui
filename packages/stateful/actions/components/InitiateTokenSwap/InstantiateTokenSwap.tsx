import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
  Loader,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { InstantiateTokenSwapProps } from './types'

// Form displayed when the user is instantiating a new token swap.
export const InstantiateTokenSwap = ({
  instantiateForm,
  selfPartyNativeBalances,
  selfPartyCw20Balances,
  counterpartyCw20Balances,
  counterpartyNativeBalances,
  onInstantiate,
  instantiating,
}: InstantiateTokenSwapProps) => {
  const { t } = useTranslation()

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = instantiateForm

  const selfParty = watch('selfParty')
  const counterparty = watch('counterparty')

  const selfCw20 = selfPartyCw20Balances.find(
    ({ address }) => selfParty.denomOrAddress === address
  )
  const selfDecimals = selfCw20
    ? selfCw20.info.decimals
    : nativeTokenDecimals(selfParty.denomOrAddress) ?? 0
  const selfMin = convertMicroDenomToDenomWithDecimals(1, selfDecimals)
  const selfMax = convertMicroDenomToDenomWithDecimals(
    selfCw20
      ? selfCw20.balance
      : selfPartyNativeBalances.find(
          ({ denom }) => selfParty.denomOrAddress === denom
        )?.amount ?? 0,
    selfDecimals
  )
  const selfSymbol =
    selfCw20?.info.symbol ?? nativeTokenLabel(selfParty.denomOrAddress)

  const counterpartyCw20 = counterpartyCw20Balances.loading
    ? undefined
    : counterpartyCw20Balances.data.find(
        ({ address }) => counterparty.denomOrAddress === address
      )
  const counterpartyDecimals = counterpartyCw20
    ? counterpartyCw20.info.decimals
    : nativeTokenDecimals(counterparty.denomOrAddress) ?? 0
  const counterpartyMin = convertMicroDenomToDenomWithDecimals(
    1,
    counterpartyDecimals
  )
  const counterpartyMax = convertMicroDenomToDenomWithDecimals(
    counterpartyCw20
      ? counterpartyCw20.balance
      : (counterpartyNativeBalances.loading
          ? undefined
          : counterpartyNativeBalances.data.find(
              ({ denom }) => counterparty.denomOrAddress === denom
            )?.amount) ?? 0,
    counterpartyDecimals
  )
  const counterpartySymbol =
    counterpartyCw20?.info.symbol ??
    nativeTokenLabel(counterparty.denomOrAddress)

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose">
        {t('form.tokenSwapInstantiateInstructions')}
      </p>

      <div className="space-y-2">
        <InputLabel name={t('form.whatSendCounterpartyQuestion')} />

        <div className="flex flex-row items-stretch gap-2">
          <NumberInput
            containerClassName="grow"
            error={errors?.selfParty?.amount}
            fieldName="selfParty.amount"
            max={selfMax}
            onMinus={() =>
              setValue(
                'selfParty.amount',
                Math.max(selfParty.amount - 1, selfMin)
              )
            }
            onPlus={() =>
              setValue(
                'selfParty.amount',
                Math.max(selfParty.amount + 1, selfMin)
              )
            }
            register={register}
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
          />

          <SelectInput
            error={errors?.selfParty?.denomOrAddress}
            fieldName="selfParty.denomOrAddress"
            onChange={(denomOrAddress) => {
              const foundCw20 = selfPartyCw20Balances.find(
                ({ address }) => counterparty.denomOrAddress === address
              )
              // Update type and decimals.
              setValue('selfParty.type', foundCw20 ? 'cw20' : 'native')
              setValue(
                'selfParty.decimals',
                foundCw20
                  ? foundCw20.info.decimals
                  : nativeTokenDecimals(denomOrAddress) ?? 0
              )
            }}
            register={register}
            style={{ maxWidth: '8.2rem' }}
          >
            {selfPartyNativeBalances.map(({ denom }) => (
              <option key={denom} value={denom}>
                ${nativeTokenLabel(denom)}
              </option>
            ))}
            {selfPartyCw20Balances.map(({ address, info: { symbol } }) => (
              <option key={address} value={address}>
                ${symbol}
              </option>
            ))}
          </SelectInput>
        </div>

        <InputErrorMessage error={errors?.selfParty?.amount} />
        <InputErrorMessage error={errors?.selfParty?.denomOrAddress} />
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.counterparty')} />

        <AddressInput
          error={errors?.counterparty?.address}
          fieldName="counterparty.address"
          register={register}
          validation={[validateRequired, validateAddress]}
        />

        <InputErrorMessage error={errors?.counterparty?.address} />
      </div>

      {counterpartyNativeBalances.loading ||
      counterpartyCw20Balances.loading ? (
        <Loader fill={false} size={32} />
      ) : (
        <>
          <div className="space-y-2">
            <InputLabel name={t('form.whatReceiveCounterpartyQuestion')} />

            <div className="flex flex-row items-stretch gap-2">
              <NumberInput
                containerClassName="grow"
                error={errors?.counterparty?.amount}
                fieldName="counterparty.amount"
                onMinus={() =>
                  setValue(
                    'counterparty.amount',
                    Math.max(counterparty.amount - 1, counterpartyMin)
                  )
                }
                onPlus={() =>
                  setValue(
                    'counterparty.amount',
                    Math.max(counterparty.amount + 1, counterpartyMin)
                  )
                }
                register={register}
                sizing="auto"
                step={counterpartyMin}
                validation={[validateRequired, validatePositive]}
              />

              <SelectInput
                error={errors?.counterparty?.denomOrAddress}
                fieldName="counterparty.denomOrAddress"
                onChange={(denomOrAddress) => {
                  const foundCw20 = counterpartyCw20Balances.data.find(
                    ({ address }) => counterparty.denomOrAddress === address
                  )
                  // Update type and decimals.
                  setValue('counterparty.type', foundCw20 ? 'cw20' : 'native')
                  setValue(
                    'counterparty.decimals',
                    foundCw20
                      ? foundCw20.info.decimals
                      : nativeTokenDecimals(denomOrAddress) ?? 0
                  )
                }}
                register={register}
                style={{ maxWidth: '8.2rem' }}
              >
                {counterpartyNativeBalances.data.map(({ denom }) => (
                  <option key={denom} value={denom}>
                    ${nativeTokenLabel(denom)}
                  </option>
                ))}
                {counterpartyCw20Balances.data.map(
                  ({ address, info: { symbol } }) => (
                    <option key={address} value={address}>
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

          <div className="flex flex-col items-end gap-1 self-end">
            <Button
              loading={instantiating}
              onClick={() => handleSubmit(onInstantiate)()}
              size="lg"
            >
              {t('button.instantiate')}
            </Button>

            <p className="caption-text text-right">
              {t('info.noFundsDuringInstantiation')}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
