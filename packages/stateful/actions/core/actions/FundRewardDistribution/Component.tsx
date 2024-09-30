import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  FilterableItemPopup,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  NumberInput,
  PercentButton,
  StatusCard,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  DaoRewardDistribution,
  GenericTokenBalance,
  LoadingData,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getFallbackImage,
  getHumanReadableRewardDistributionLabel,
  toAccessibleImageUrl,
  tokensEqual,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type FundRewardDistributionData = {
  address: string
  id: number
  amount: number
}

export type FundRewardDistributionOptions = {
  /**
   * Existing reward distributions.
   */
  distributions: DaoRewardDistribution[]
  /**
   * All tokens owned by the DAO on its home chain.
   */
  tokens: LoadingData<GenericTokenBalance[]>
}

export const FundRewardDistributionComponent: ActionComponent<
  FundRewardDistributionOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { distributions, tokens },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } =
    useFormContext<FundRewardDistributionData>()

  const address = watch((fieldNamePrefix + 'address') as 'address')
  const id = watch((fieldNamePrefix + 'id') as 'id')
  const amount = watch((fieldNamePrefix + 'amount') as 'amount')

  const selectedDistribution = distributions.find(
    (distribution) => distribution.address === address && distribution.id === id
  )

  const selectedBalance =
    selectedDistribution && !tokens.loading
      ? HugeDecimal.from(
          tokens.data.find((t) =>
            tokensEqual(t.token, selectedDistribution.token)
          )?.balance || 0
        )
      : HugeDecimal.zero

  const warning =
    !isCreating || tokens.loading || tokens.updating || !selectedDistribution
      ? undefined
      : amount &&
        selectedBalance
          .toHumanReadable(selectedDistribution.token.decimals)
          .lt(amount)
      ? t('error.insufficientFundsWarning', {
          amount: selectedBalance.toInternationalizedHumanReadableString({
            decimals: selectedDistribution.token.decimals,
          }),
          tokenSymbol: selectedDistribution.token.symbol,
        })
      : undefined

  const minAmount = HugeDecimal.one.toHumanReadableNumber(
    selectedDistribution?.token.decimals ?? 0
  )

  const selectedDistributionDisplay = selectedDistribution && (
    <>
      <div
        className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${toAccessibleImageUrl(
            selectedDistribution.token.imageUrl ||
              getFallbackImage(selectedDistribution.token.denomOrAddress)
          )})`,
        }}
      ></div>

      {getHumanReadableRewardDistributionLabel(t, selectedDistribution)}
    </>
  )

  return (
    <>
      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('title.distribution')} primary />

        {isCreating ? (
          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={distributions.map((distribution) => ({
              key: distribution.address + distribution.id,
              selected: selectedDistribution === distribution,
              iconUrl:
                distribution.token.imageUrl ||
                getFallbackImage(distribution.token.denomOrAddress),
              label: getHumanReadableRewardDistributionLabel(t, distribution),
              ...distribution,
            }))}
            onSelect={({ address, id }) => {
              setValue((fieldNamePrefix + 'address') as 'address', address)
              setValue((fieldNamePrefix + 'id') as 'id', id)
            }}
            trigger={{
              type: 'button',
              props: {
                className: 'self-start',
                variant: !address ? 'primary' : 'ghost_outline',
                size: 'lg',
                children: selectedDistribution ? (
                  <>
                    {selectedDistributionDisplay}
                    <ArrowDropDown className="!h-6 !w-6 text-icon-primary" />
                  </>
                ) : (
                  t('button.chooseDistribution')
                ),
              },
            }}
          />
        ) : (
          <InputThemedText className="!py-2 !px-3">
            {selectedDistributionDisplay}
          </InputThemedText>
        )}
      </div>

      {selectedDistribution && (
        <>
          <div className="flex flex-col gap-2 max-w-prose">
            <InputLabel name={t('form.funds')} primary />

            <NumberInput
              containerClassName={clsx(!isCreating && 'self-start')}
              disabled={!isCreating}
              fieldName={(fieldNamePrefix + 'amount') as 'amount'}
              min={0}
              register={register}
              setValue={setValue}
              step={minAmount}
              unit={'$' + selectedDistribution.token.symbol}
              validation={[validateRequired, validatePositive]}
              watch={watch}
            />
            <InputErrorMessage error={errors?.amount} />
            <InputErrorMessage error={warning} warning />
          </div>

          {isCreating && (
            <div className="flex flex-row justify-between flex-wrap items-center -mt-2 mb-2 gap-x-8 gap-y-2 max-w-prose">
              <div className="flex flex-row items-center gap-2">
                <p className="caption-text">{t('info.yourBalance')}:</p>

                <TokenAmountDisplay
                  amount={selectedBalance}
                  decimals={selectedDistribution.token.decimals}
                  iconUrl={selectedDistribution.token.imageUrl}
                  onClick={() =>
                    setValue(
                      (fieldNamePrefix + 'amount') as 'amount',
                      selectedBalance.toHumanReadableNumber(
                        selectedDistribution.token.decimals
                      )
                    )
                  }
                  showFullAmount
                  symbol={selectedDistribution.token.symbol}
                />
              </div>

              {selectedBalance.isPositive() && (
                <div className="grid grid-cols-5 gap-1">
                  {[10, 25, 50, 75, 100].map((percent) => (
                    <PercentButton
                      key={percent}
                      amount={HugeDecimal.fromHumanReadable(
                        amount,
                        selectedDistribution.token.decimals
                      )}
                      loadingMax={{ loading: false, data: selectedBalance }}
                      percent={percent}
                      setAmount={(amount) =>
                        setValue(
                          (fieldNamePrefix + 'amount') as 'amount',
                          amount.toHumanReadableNumber(
                            selectedDistribution.token.decimals
                          )
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {isCreating &&
            'immediate' in selectedDistribution.active_epoch.emission_rate && (
              <StatusCard
                className="self-start max-w-prose"
                content={t('info.rewardsFundsWillBeDistributedImmediately', {
                  context: 'update',
                })}
                style="warning"
              />
            )}
        </>
      )}
    </>
  )
}

const FILTERABLE_KEYS = [
  'label',
  'address',
  'id',
  'chainId',
  'token.symbol',
  'token.denomOrAddress',
]
