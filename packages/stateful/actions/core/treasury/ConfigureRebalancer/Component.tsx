import { Close } from '@mui/icons-material'
import { ComponentType, useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  Loader,
  NumberInput,
  RebalancerProjector,
  RebalancerProjectorAsset,
  SelectInput,
  SwitchCard,
  TokenInput,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  AmountWithTimestamp,
  GenericTokenBalance,
  LoadingData,
  ValenceAccount,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { TargetOverrideStrategy } from '@dao-dao/types/contracts/ValenceServiceRebalancer'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
  getNativeTokenForChainId,
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type ConfigureRebalancerData = {
  // Will be set when a valence account is found so the transformation function
  // has the address.
  valenceAccount?: ValenceAccount
  chainId: string
  trustee?: string
  baseDenom: string
  tokens: {
    denom: string
    percent: number
    minBalance?: number
  }[]
  pid: {
    kp: number
    ki: number
    kd: number
  }
  maxLimit?: number
  targetOverrideStrategy: TargetOverrideStrategy
}

export type ConfigureRebalancerOptions = {
  nativeBalances: LoadingData<GenericTokenBalance[]>
  historicalPrices: LoadingData<
    {
      denom: string
      prices: AmountWithTimestamp[]
    }[]
  >
  AddressInput: ComponentType<AddressInputProps<ConfigureRebalancerData>>
}

export const ConfigureRebalancerComponent: ActionComponent<
  ConfigureRebalancerOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { nativeBalances, historicalPrices, AddressInput },
}) => {
  const { t } = useTranslation()
  const {
    chainId,
    chain: { bech32_prefix: bech32Prefix },
    config: { valence },
  } = useSupportedChainContext()

  const allowedBaseTokenBalances = nativeBalances.loading
    ? []
    : nativeBalances.data.filter(({ token }) =>
        valence?.rebalancer.baseTokenAllowlist.includes(token.denomOrAddress)
      )
  const allowedTokenBalances = nativeBalances.loading
    ? []
    : nativeBalances.data.filter(({ token }) =>
        valence?.rebalancer.tokenAllowlist.includes(token.denomOrAddress)
      )

  const { control, watch, register, setValue, clearErrors, setError } =
    useFormContext<ConfigureRebalancerData>()
  const {
    fields: tokensFields,
    append: appendToken,
    remove: removeToken,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'tokens') as 'tokens',
  })

  const baseDenom = watch((fieldNamePrefix + 'baseDenom') as 'baseDenom')
  const pid = watch((fieldNamePrefix + 'pid') as 'pid')
  const tokens = watch((fieldNamePrefix + 'tokens') as 'tokens')
  const totalPercent = watch((fieldNamePrefix + `tokens`) as 'tokens').reduce(
    (acc, { percent }) => acc + percent,
    0
  )

  const maxLimit = watch((fieldNamePrefix + 'maxLimit') as 'maxLimit')
  const maxLimitEnabled = maxLimit !== undefined

  // Validate all add up to 100%.
  useEffect(() => {
    if (totalPercent === 100) {
      clearErrors(
        (fieldNamePrefix +
          `tokens.${
            tokensFields.length - 1
          }.percent`) as `tokens.${number}.percent`
      )
    } else {
      setError(
        (fieldNamePrefix +
          `tokens.${
            tokensFields.length - 1
          }.percent`) as `tokens.${number}.percent`,
        {
          type: 'manual',
          message: t('error.percentageDoesNotSumTo100', {
            totalPercent: formatPercentOf100(totalPercent),
          }),
        }
      )
    }
  }, [
    t,
    clearErrors,
    setError,
    totalPercent,
    fieldNamePrefix,
    tokensFields.length,
  ])

  const [projection, setProjection] = useState(false)

  const rebalanceTimestamps = historicalPrices.loading
    ? []
    : // All tokens historical price lists should have the same timestamps, so we just need to pick the first one that has prices loaded.
      historicalPrices.data
        .find(({ prices }) => prices.length)
        ?.prices.map(({ timestamp }) => timestamp)
        // Rebalance one fewer time than how many prices we have. The rebalancer
        // projector expects number of rebalances to be one fewer than the
        // number of prices since the first price acts as the initial price.
        ?.slice(1) || []

  return (
    <>
      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('form.baseToken')} primary />
        <p className="body-text -mt-1 max-w-prose text-sm text-text-secondary">
          {t('form.rebalancerBaseTokenDescription')}
        </p>

        <TokenInput
          onSelectToken={({ denomOrAddress }) =>
            setValue(
              (fieldNamePrefix + 'baseDenom') as 'baseDenom',
              denomOrAddress
            )
          }
          readOnly={!isCreating}
          selectedToken={
            allowedBaseTokenBalances.find(
              ({ token }) => token.denomOrAddress === baseDenom
            )?.token
          }
          tokens={
            nativeBalances.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: allowedBaseTokenBalances.map(({ token }) => token),
                }
          }
        />
      </div>

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('form.trustee')} optional primary />
        <p className="body-text -mt-1 max-w-prose text-sm text-text-secondary">
          {t('form.rebalancerTrusteeDescription')}
        </p>

        <AddressInput
          disabled={!isCreating}
          error={errors?.trustee}
          fieldName={(fieldNamePrefix + 'trustee') as 'trustee'}
          register={register}
          validation={[makeValidateAddress(bech32Prefix, false)]}
        />
      </div>

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('form.tokenTargets')} primary />

        {/* TODO: support minBalance */}
        {tokensFields.map(({ id }, index) => {
          const watchDenom = watch(
            (fieldNamePrefix +
              `tokens.${index}.denom`) as `tokens.${number}.denom`
          )
          const watchMinBalance = watch(
            (fieldNamePrefix +
              `tokens.${index}.minBalance`) as `tokens.${number}.minBalance`
          )
          const minBalanceEnabled = watchMinBalance !== undefined

          const selectedToken = allowedTokenBalances.find(
            ({ token }) => token.denomOrAddress === watchDenom
          )?.token

          return (
            <div key={id} className="rounded-md bg-background-tertiary p-4">
              <div className="flex flex-row items-stretch justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <TokenInput
                    amount={{
                      watch,
                      setValue,
                      register,
                      fieldName: (fieldNamePrefix +
                        `tokens.${index}.percent`) as `tokens.${number}.percent`,
                      error: errors?.tokens?.[index]?.percent,
                      min: 0.01,
                      max: 100,
                      step: 0.01,
                      unit: '%',
                    }}
                    onSelectToken={({ denomOrAddress }) =>
                      setValue(
                        (fieldNamePrefix +
                          `tokens.${index}.denom`) as `tokens.${number}.denom`,
                        denomOrAddress
                      )
                    }
                    readOnly={!isCreating}
                    selectedToken={selectedToken}
                    tokens={
                      nativeBalances.loading
                        ? { loading: true }
                        : {
                            loading: false,
                            data: allowedTokenBalances.map(
                              ({ token }) => token
                            ),
                          }
                    }
                  />

                  <div className="flex flex-row items-stretch gap-2">
                    <SwitchCard
                      enabled={minBalanceEnabled}
                      label={t('form.minBalance')}
                      onClick={() =>
                        setValue(
                          (fieldNamePrefix +
                            `tokens.${index}.minBalance`) as `tokens.${number}.minBalance`,
                          minBalanceEnabled ? undefined : 1
                        )
                      }
                      readOnly={!isCreating}
                      sizing="sm"
                      tooltip={t('form.rebalancerMinBalanceDescription')}
                      tooltipIconSize="sm"
                    />

                    {minBalanceEnabled && (
                      <NumberInput
                        disabled={!isCreating}
                        error={errors?.tokens?.[index]?.minBalance}
                        fieldName={
                          (fieldNamePrefix +
                            `tokens.${index}.minBalance`) as `tokens.${number}.minBalance`
                        }
                        hidePlusMinus
                        min={convertMicroDenomToDenomWithDecimals(
                          1,
                          selectedToken?.decimals ?? 0
                        )}
                        register={register}
                        setValue={setValue}
                        sizing="md"
                        step={convertMicroDenomToDenomWithDecimals(
                          1,
                          selectedToken?.decimals ?? 0
                        )}
                        unit={'$' + selectedToken?.symbol}
                        validation={[validatePositive]}
                        watch={watch}
                      />
                    )}
                  </div>
                </div>

                {isCreating && (
                  <IconButton
                    Icon={Close}
                    className="self-center"
                    onClick={() => removeToken(index)}
                    size="sm"
                    variant="ghost"
                  />
                )}
              </div>

              <InputErrorMessage
                error={
                  errors?.tokens?.[index]?.percent ||
                  errors?.tokens?.[index]?.denom ||
                  errors?.tokens?.[index]?.minBalance
                }
              />
            </div>
          )
        })}

        {isCreating ? (
          <Button
            className="self-start"
            onClick={() =>
              appendToken({
                percent: 25,
                denom:
                  allowedTokenBalances[0]?.token.denomOrAddress ||
                  getNativeTokenForChainId(chainId).denomOrAddress,
              })
            }
            variant="secondary"
          >
            {t('button.addToken')}
          </Button>
        ) : (
          tokensFields.length === 0 && (
            <p className="mt-1 mb-2 text-xs italic text-text-tertiary">
              {t('info.none')}
            </p>
          )
        )}
      </div>

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('form.targetOverrideStrategy')} primary />
        <p className="body-text -mt-1 max-w-prose text-sm text-text-secondary">
          {t('form.targetOverrideStrategyDescription')}
        </p>

        <SelectInput
          disabled={!isCreating}
          fieldName={
            (fieldNamePrefix +
              'targetOverrideStrategy') as 'targetOverrideStrategy'
          }
          register={register}
        >
          <option value="proportional">{t('form.proportional')}</option>
          <option value="priority">{t('form.priority')}</option>
        </SelectInput>
      </div>

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('form.maximumSellablePerCycle')} primary />
        <p className="body-text -mt-1 max-w-prose text-sm text-text-secondary">
          {t('form.maximumSellablePerCycleDescription')}
        </p>

        <div className="flex flex-row gap-2 self-start">
          {maxLimitEnabled && (
            <NumberInput
              containerClassName="grow min-w-[min(8rem,50%)]"
              error={errors?.maxLimit}
              fieldName={(fieldNamePrefix + 'maxLimit') as 'maxLimit'}
              max={100}
              min={0.01}
              register={register}
              setValue={setValue}
              sizing="auto"
              step={0.01}
              validation={[validatePositive, validateRequired]}
              watch={watch}
            />
          )}

          <SelectInput
            onChange={(value) =>
              setValue(
                (fieldNamePrefix + 'maxLimit') as 'maxLimit',
                value === '%' ? 5 : undefined
              )
            }
            validation={[validateRequired]}
            value={maxLimitEnabled ? '%' : 'none'}
          >
            <option value="none">{t('form.noLimit')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
      </div>

      {/* PID terms */}
      <div className="flex flex-row flex-wrap gap-2">
        <div className="space-y-2">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <InputLabel name="kp" />
          <NumberInput
            error={errors?.pid?.kp}
            fieldName={(fieldNamePrefix + 'pid.kp') as 'pid.kp'}
            hidePlusMinus
            max={1}
            min={0}
            register={register}
            sizing="sm"
            step={0.01}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.pid?.kp} />
        </div>

        <div className="space-y-2">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <InputLabel name="ki" />
          <NumberInput
            error={errors?.pid?.ki}
            fieldName={(fieldNamePrefix + 'pid.ki') as 'pid.ki'}
            hidePlusMinus
            max={1}
            min={0}
            register={register}
            sizing="sm"
            step={0.01}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.pid?.ki} />
        </div>

        <div className="space-y-2">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <InputLabel name="kd" />
          <NumberInput
            error={errors?.pid?.kd}
            fieldName={(fieldNamePrefix + 'pid.kd') as 'pid.kd'}
            hidePlusMinus
            max={1}
            min={0}
            register={register}
            sizing="sm"
            step={0.01}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.pid?.kd} />
        </div>
      </div>

      <SwitchCard
        containerClassName="self-end"
        enabled={projection}
        label={t('form.projection')}
        onClick={() => setProjection((p) => !p)}
        sizing="sm"
      />

      {projection &&
        (nativeBalances.loading || historicalPrices.loading ? (
          <Loader />
        ) : (
          <RebalancerProjector
            assets={tokens.flatMap(
              ({ denom, percent }): RebalancerProjectorAsset | [] => {
                const { token, balance: _balance } =
                  nativeBalances.data.find(
                    ({ token }) => token.denomOrAddress === denom
                  ) ?? {}
                const balance = Number(_balance) || 10000000000
                const prices = historicalPrices.data.find(
                  ({ denom: priceDenom }) => priceDenom === denom
                )?.prices

                if (!token || !balance || !prices) {
                  return []
                }

                return {
                  symbol:
                    nativeBalances.data.find(
                      ({ token }) => token.denomOrAddress === denom
                    )?.token.symbol || denom,
                  initialAmount: convertMicroDenomToDenomWithDecimals(
                    balance,
                    token.decimals
                  ),
                  targetProportion: percent / 100,
                  prices: prices.map(({ amount }) => amount),
                }
              }
            )}
            className="h-72"
            pid={{
              ...pid,
              interval: 1,
            }}
            rebalanceTimestamps={rebalanceTimestamps}
          />
        ))}
    </>
  )
}
