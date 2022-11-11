import { ArrowOutward } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboard,
  FilterableItemPopup,
  IconButtonLink,
  InputThemedText,
  TokenAmountDisplay,
  Tooltip,
} from '@dao-dao/stateless'
import { TokenStake, Validator } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
  nativeTokenLabel,
} from '@dao-dao/utils'

export interface ValidatorPickerProps {
  validators: Validator[]
  stakes?: TokenStake[]
  selectedAddress?: string
  readOnly: boolean
  onSelect: (validator: Validator) => void
  // Denom and decimals that correspond with validator.tokens (likely the native
  // token on the chain).
  nativeDenom: string
  nativeDecimals: number
}

export const ValidatorPicker = ({
  validators,
  stakes,
  selectedAddress,
  readOnly,
  onSelect,
  nativeDenom,
  nativeDecimals,
}: ValidatorPickerProps) => {
  const { t } = useTranslation()

  const selectedValidator = validators.find(
    (validator) => validator.address === selectedAddress
  )

  // Map validator address to staked amount.
  const validatorStakedAmountMap = stakes?.reduce(
    (acc, stake) => ({
      ...acc,
      [stake.validator.address]: stake.amount,
    }),
    {} as Record<string, number | undefined>
  )

  // Sort staked first, then by total staked tokens (i.e. voting powe and
  // popularity).
  const sortedValidators = [...validators].sort((a, b) => {
    const aStake = validatorStakedAmountMap?.[a.address]
    const bStake = validatorStakedAmountMap?.[b.address]

    if (aStake && bStake) {
      return bStake - aStake
    }

    if (aStake) {
      return -1
    }

    if (bStake) {
      return 1
    }

    return b.tokens - a.tokens
  })

  return (
    <FilterableItemPopup
      Trigger={({ open, ...props }) => (
        <>
          {selectedAddress && (
            <InputThemedText className="flex flex-row items-center justify-between gap-10">
              <CopyToClipboard
                label={selectedValidator?.moniker}
                tooltip={t('button.clickToCopyAddress')}
                value={selectedAddress}
              />

              {!readOnly && (
                <Button pressed={open} variant="ghost" {...props}>
                  {t('button.change')}
                </Button>
              )}
            </InputThemedText>
          )}

          {!readOnly && !selectedAddress && (
            <Button
              center
              pressed={open}
              size="lg"
              variant="primary"
              {...props}
            >
              {t('button.selectValidator')}
            </Button>
          )}
        </>
      )}
      filterableItemKeys={FILTERABLE_KEYS}
      items={sortedValidators.map((validator) => {
        const { address, moniker, details, website, commission, tokens } =
          validator

        const existingStake = stakes?.find(
          (stake) => stake.validator.address === address
        )

        return {
          validator,
          key: address,
          label: moniker,
          description: (
            <div className="space-y-1">
              {existingStake && (
                <TokenAmountDisplay
                  amount={existingStake.amount}
                  className="inline-block text-text-brand"
                  decimals={existingStake.decimals}
                  prefix={t('title.daosStake') + ': '}
                  prefixClassName="font-semibold"
                  showFullAmount
                  symbol={existingStake.symbol}
                />
              )}

              <p>
                <span className="font-semibold">{t('title.commission')}:</span>{' '}
                {formatPercentOf100(commission * 100)}
              </p>

              <TokenAmountDisplay
                amount={convertMicroDenomToDenomWithDecimals(
                  tokens,
                  nativeDecimals
                )}
                className="inline-block"
                decimals={nativeDecimals}
                prefix={t('title.votingPower') + ': '}
                prefixClassName="font-semibold"
                symbol={nativeTokenLabel(nativeDenom)}
              />

              {details && <p>{details}</p>}
            </div>
          ),
          searchableDescription: commission + details,
          rightNode: website ? (
            <Tooltip title={website}>
              <IconButtonLink
                Icon={ArrowOutward}
                href={website}
                onClick={(event) => {
                  // Don't click on item button.
                  event.stopPropagation()
                }}
                variant="ghost"
              />
            </Tooltip>
          ) : undefined,
        }
      })}
      onSelect={({ validator }) => onSelect(validator)}
      searchPlaceholder={t('info.searchValidatorsPlaceholder')}
    />
  )
}

const FILTERABLE_KEYS = ['label', 'searchableDescription']
