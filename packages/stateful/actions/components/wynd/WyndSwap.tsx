import {
  ArrowDownwardRounded,
  ArrowDropDown,
  InfoRounded,
  SwapVertRounded,
  WarningRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CycleEmoji,
  FilterableItemPopup,
  FilterableItemPopupProps,
  IconButton,
  InputErrorMessage,
  InputThemedText,
  Loader,
  NumberInput,
  PercentButton,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  ActionOptionsContextType,
  AddressInputProps,
  AmountWithTimestamp,
  GenericToken,
  GenericTokenBalance,
  LoadingData,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { SwapOperation } from '@dao-dao/types/contracts/WyndexMultiHop'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../react'
import { ActionCard } from '../ActionCard'

export interface WyndSwapData {
  tokenIn: GenericToken
  tokenInAmount: number
  tokenOut: GenericToken
  tokenOutAmount: number
  minOutAmount?: number
  maxSlippage?: number
  swapOperations: SwapOperation[] | undefined
  receiver: string
}

export interface WyndSwapOptions {
  balances: GenericTokenBalance[]
  wyndTokens: GenericToken[]
  simulatingValue: 'tokenIn' | 'tokenOut' | undefined
  estUsdPrice: LoadingData<AmountWithTimestamp | undefined>
  AddressInput: ComponentType<AddressInputProps>
}

export const WyndSwapComponent: ActionComponent<WyndSwapOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { balances, wyndTokens, simulatingValue, estUsdPrice, AddressInput },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()

  const { register, watch, setValue } = useFormContext()
  const tokenIn = watch(fieldNamePrefix + 'tokenIn') as GenericToken
  const tokenInAmount = watch(fieldNamePrefix + 'tokenInAmount') as number
  const tokenOut = watch(fieldNamePrefix + 'tokenOut') as GenericToken
  const tokenOutAmount = watch(fieldNamePrefix + 'tokenOutAmount') as number
  const minOutAmount = watch(fieldNamePrefix + 'minOutAmount') as
    | number
    | undefined
  const maxSlippage = watch(fieldNamePrefix + 'maxSlippage') as
    | number
    | undefined

  const tokenInBalance = convertMicroDenomToDenomWithDecimals(
    balances.find(
      ({ token }) => token.denomOrAddress === tokenIn.denomOrAddress
    )?.balance || '0',
    tokenIn.decimals
  )
  const tokenOutBalance = convertMicroDenomToDenomWithDecimals(
    balances.find(
      ({ token }) => token.denomOrAddress === tokenOut.denomOrAddress
    )?.balance || '0',
    tokenOut.decimals
  )

  const availableTokenItems = useMemo(
    () =>
      wyndTokens.map(({ denomOrAddress, symbol, imageUrl }) => {
        const { token, balance } = balances.find(
          ({ token }) => token.denomOrAddress === denomOrAddress
        ) ?? { token: undefined, balance: '0' }

        return {
          key: denomOrAddress,
          label: '$' + symbol,
          description: balance !== '0' && (
            <p className="caption-text -mt-1">
              {!token
                ? `${t('title.balance')}: 0`
                : `${t(
                    'title.balance'
                  )}: ${convertMicroDenomToDenomWithDecimals(
                    balance,
                    token.decimals
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: token.decimals,
                  })}`}
            </p>
          ),
          Icon: () => (
            <div
              className="h-8 w-8 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ),
          contentContainerClassName: '!gap-2',
        }
      }),
    [balances, t, wyndTokens]
  )

  const makeTokenTrigger = useCallback(
    ({ imageUrl, symbol, decimals }: GenericToken, balance: number) => {
      const TokenTrigger: FilterableItemPopupProps['Trigger'] = ({
        open,
        ...props
      }) => (
        <Button
          disabled={!isCreating}
          pressed={open}
          variant="ghost"
          {...props}
        >
          <div
            className="mr-1 h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="flex max-w-[10rem] flex-col items-start gap-1 overflow-hidden text-left">
            <p className="title-text max-w-full truncate">${symbol}</p>
            {isCreating && (
              <p className="caption-text">
                {t('title.balance')}:{' '}
                {balance.toLocaleString(undefined, {
                  maximumFractionDigits: decimals,
                })}
              </p>
            )}
          </div>
          {isCreating && <ArrowDropDown className="ml-2 !h-6 !w-6" />}
        </Button>
      )
      return TokenTrigger
    },
    [isCreating, t]
  )

  const TokenInTrigger = useMemo(
    () => makeTokenTrigger(tokenIn, tokenInBalance),
    [makeTokenTrigger, tokenIn, tokenInBalance]
  )

  const TokenOutTrigger = useMemo(
    () => makeTokenTrigger(tokenOut, tokenOutBalance),
    [makeTokenTrigger, tokenOut, tokenOutBalance]
  )

  const insufficientBalanceI18nKey =
    context.type === ActionOptionsContextType.Dao
      ? 'error.cantSpendMoreThanTreasury'
      : 'error.insufficientWalletBalance'

  // When not creating, -1 indicates loading price from TX.
  const loadingOutputPriceFromExecution = !isCreating && tokenOutAmount === -1

  // Handle swap button animation.
  const [hoveringOverSwap, setHoveringOverSwap] = useState(false)
  const [swapCycles, setSwapCycles] = useState(0)

  return (
    <ActionCard
      Icon={CycleEmoji}
      onRemove={onRemove}
      title={t('title.swapTokensOnWynd')}
    >
      <InputErrorMessage
        className="-mb-2 self-end text-right"
        error={errors?.tokenInAmount}
      />

      <div className="flex flex-col gap-3">
        <div
          className={clsx(
            'relative flex flex-row items-stretch gap-4 rounded-md border bg-background-base p-2 pr-6',
            errors?.tokenInAmount
              ? 'border-border-interactive-error'
              : 'border-border-primary'
          )}
        >
          <FilterableItemPopup
            Trigger={TokenInTrigger}
            filterableItemKeys={FILTERABLE_KEYS}
            items={availableTokenItems}
            onSelect={(_, index) =>
              setValue(fieldNamePrefix + 'tokenIn', wyndTokens[index])
            }
            searchPlaceholder={t('info.searchForToken')}
          />

          {simulatingValue === 'tokenIn' ? (
            <div className="flex grow flex-row items-center justify-end">
              <Loader fill={false} size={24} />
            </div>
          ) : (
            <NumberInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.tokenInAmount}
              fieldName={fieldNamePrefix + 'tokenInAmount'}
              ghost
              hidePlusMinus
              max={tokenInBalance}
              min={1 / 10 ** tokenIn.decimals}
              register={register}
              setValue={setValue}
              sizing="auto"
              step={1 / 10 ** tokenIn.decimals}
              textClassName="text-lg"
              validation={[
                validateRequired,
                validatePositive,
                (value) =>
                  value <= tokenInBalance ||
                  t(insufficientBalanceI18nKey, {
                    amount: value.toLocaleString(undefined, {
                      maximumFractionDigits: tokenIn.decimals,
                    }),
                    tokenSymbol: tokenIn.symbol,
                  }),
              ]}
              watch={watch}
            />
          )}

          {/* In the middle, arrow pointing down (from in to out) and swap button. */}
          <div className="pointer-events-none absolute left-0 right-0 top-full -mt-3 flex items-center justify-center">
            {isCreating ? (
              <IconButton
                Icon={hoveringOverSwap ? SwapVertRounded : ArrowDownwardRounded}
                circular
                className={clsx(
                  'pointer-events-auto !h-8 !w-8 border border-border-primary bg-background-base sm:!h-10 sm:!w-10',
                  swapCycles > 0
                    ? 'animate-[breathe_200ms_ease-in-out,spin_200ms_ease-in-out]'
                    : 'hover:animate-breathe'
                )}
                iconClassName="!h-6 !w-6 sm:!h-7 sm:!w-7 !text-icon-secondary"
                onAnimationEnd={() => setSwapCycles(0)}
                onAnimationIteration={() => setSwapCycles((prev) => prev - 1)}
                onClick={() => {
                  setValue(fieldNamePrefix + 'tokenIn', tokenOut)
                  setValue(fieldNamePrefix + 'tokenInAmount', tokenOutAmount)
                  setValue(fieldNamePrefix + 'tokenOut', tokenIn)
                  setValue(fieldNamePrefix + 'tokenOutAmount', tokenInAmount)
                  setValue(
                    fieldNamePrefix + 'minOutAmount',
                    Number((tokenInAmount * 0.99).toFixed(tokenIn.decimals))
                  )
                  setSwapCycles((prev) => prev + 1)
                }}
                onMouseLeave={() => setHoveringOverSwap(false)}
                onMouseOver={() => setHoveringOverSwap(true)}
                size="custom"
                variant="none"
              />
            ) : (
              <div className="flex !h-8 !w-8 flex-row items-center justify-center rounded-full border border-border-primary bg-background-base sm:!h-10 sm:!w-10">
                <ArrowDownwardRounded className="!h-6 !w-6 !text-icon-secondary sm:!h-7 sm:!w-7" />
              </div>
            )}
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-row items-stretch gap-4 rounded-md border bg-background-base p-2 pr-6',
            errors?.tokenOutAmount
              ? 'border-border-interactive-error'
              : 'border-border-primary'
          )}
        >
          <FilterableItemPopup
            Trigger={TokenOutTrigger}
            filterableItemKeys={FILTERABLE_KEYS}
            items={availableTokenItems}
            onSelect={(_, index) =>
              setValue(fieldNamePrefix + 'tokenOut', wyndTokens[index])
            }
            searchPlaceholder={t('info.searchForToken')}
          />

          {simulatingValue === 'tokenOut' || loadingOutputPriceFromExecution ? (
            <div className="flex grow flex-row items-center justify-end">
              <Loader fill={false} size={24} />
            </div>
          ) : (
            <NumberInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.tokenOutAmount}
              fieldName={fieldNamePrefix + 'tokenOutAmount'}
              ghost
              hidePlusMinus
              min={1 / 10 ** tokenOut.decimals}
              register={register}
              setValue={setValue}
              sizing="auto"
              step={1 / 10 ** tokenOut.decimals}
              textClassName="text-lg"
              validation={[validateRequired, validatePositive]}
              watch={watch}
            />
          )}
        </div>
      </div>

      <InputErrorMessage
        className="-mt-2 self-end pr-6 text-right"
        error={errors?.tokenOutAmount}
      />

      {!loadingOutputPriceFromExecution &&
        (estUsdPrice.loading || estUsdPrice.data?.amount !== undefined ? (
          <TokenAmountDisplay
            amount={
              estUsdPrice.loading ? estUsdPrice : estUsdPrice.data!.amount
            }
            className="secondary-text self-end pr-6 text-right"
            dateFetched={
              estUsdPrice.loading ? undefined : estUsdPrice.data!.timestamp
            }
            estimatedUsdValue
          />
        ) : (
          <p className="secondary-text self-end pr-6 text-right">
            {t('info.noPriceData')}
          </p>
        ))}

      <div className="flex max-w-prose flex-col gap-6">
        {/* Recipient */}
        <div className="space-y-2">
          <p className="primary-text">{t('title.recipient')}</p>
          <AddressInput
            disabled={!isCreating}
            error={errors?.receiver}
            fieldName={fieldNamePrefix + 'receiver'}
            register={register}
            setValue={setValue}
            validation={[validateRequired, validateAddress]}
            watch={watch}
          />
          <InputErrorMessage error={errors?.receiver} />
        </div>

        {/* Min output */}
        {(minOutAmount !== undefined || isCreating) && (
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <p className="primary-text">{t('title.minimumOutputRequired')}</p>
              <p className="caption-text">
                {t('info.minimumOutputRequiredDescription', {
                  context: context.type,
                })}
              </p>
            </div>

            {isCreating && (
              <div className="grid grid-cols-5 gap-2">
                <Button
                  center
                  onClick={() =>
                    setValue(fieldNamePrefix + 'minOutAmount', undefined, {
                      shouldValidate: true,
                    })
                  }
                  pressed={minOutAmount === undefined}
                  variant="secondary"
                >
                  {t('button.none')}
                </Button>

                {[90, 95, 97, 99].map((percent) => (
                  <PercentButton
                    key={percent}
                    amount={minOutAmount ?? 0}
                    decimals={tokenOut.decimals}
                    label={`${percent}%`}
                    loadingMax={{ loading: false, data: tokenOutAmount }}
                    percent={percent / 100}
                    setAmount={(amount) =>
                      setValue(fieldNamePrefix + 'minOutAmount', amount, {
                        shouldValidate: true,
                      })
                    }
                  />
                ))}
              </div>
            )}

            {isCreating ? (
              <NumberInput
                error={errors?.minOutAmount}
                fieldName={fieldNamePrefix + 'minOutAmount'}
                max={tokenOutAmount}
                min={1 / 10 ** tokenOut.decimals}
                register={register}
                setValue={setValue}
                sizing="fill"
                step={1 / 10 ** tokenOut.decimals}
                unit={'$' + tokenOut.symbol}
                validation={[(v) => v === undefined || validatePositive(v)]}
                watch={watch}
              />
            ) : (
              <InputThemedText
                className="self-start"
                unit={'$' + tokenOut.symbol}
              >
                {minOutAmount?.toLocaleString(undefined, {
                  maximumFractionDigits: tokenOut.decimals,
                })}
              </InputThemedText>
            )}

            <InputErrorMessage
              className="-mt-2 self-end text-right"
              error={errors?.minOutAmount}
            />
          </div>
        )}

        {/* Max slippage */}
        {(maxSlippage !== undefined || isCreating) && (
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <p className="primary-text">{t('title.maxSlippage')}</p>
              <p className="caption-text">{t('info.maxSlippageDescription')}</p>
            </div>

            {isCreating ? (
              <div className="grid grid-cols-5 gap-2">
                <Button
                  center
                  onClick={() =>
                    setValue(fieldNamePrefix + 'maxSlippage', undefined, {
                      shouldValidate: true,
                    })
                  }
                  pressed={maxSlippage === undefined}
                  variant="secondary"
                >
                  {t('button.none')}
                </Button>

                {[1, 1.5, 2, 3].map((percent) => (
                  <PercentButton
                    key={percent}
                    amount={maxSlippage ?? 0}
                    decimals={
                      // 1.5% (0.015) has the most decimals: 3
                      3
                    }
                    label={`${percent}%`}
                    loadingMax={{ loading: false, data: 1 }}
                    percent={percent / 100}
                    setAmount={(amount) =>
                      setValue(fieldNamePrefix + 'maxSlippage', amount, {
                        shouldValidate: true,
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <InputThemedText className="self-start">
                {formatPercentOf100(maxSlippage! * 100)}
              </InputThemedText>
            )}
          </div>
        )}

        {/* Summary */}
        <div className="flex max-w-prose flex-row items-center gap-3 rounded-md bg-background-tertiary p-4">
          {minOutAmount === undefined ? (
            <WarningRounded className="!h-14 !w-14 text-icon-interactive-warning" />
          ) : (
            <InfoRounded className="!h-10 !w-10" />
          )}

          <p
            className={clsx(
              'body-text',
              minOutAmount === undefined && 'text-text-interactive-warning-body'
            )}
          >
            {t(
              'info.wyndSwapSummary',
              minOutAmount === undefined
                ? {
                    context: 'unsafe',
                    in: t('format.token', {
                      amount: tokenInAmount,
                      symbol: tokenIn.symbol,
                    }),
                    outSymbol: tokenOut.symbol,
                  }
                : {
                    context: 'minOut',
                    in: t('format.token', {
                      amount: tokenInAmount,
                      symbol: tokenIn.symbol,
                    }),
                    minOut: t('format.token', {
                      amount: minOutAmount,
                      symbol: tokenOut.symbol,
                    }),
                  }
            )}
          </p>
        </div>
      </div>

      <InputErrorMessage error={errors?.swapOperations} />
    </ActionCard>
  )
}

const FILTERABLE_KEYS = ['key', 'label']
