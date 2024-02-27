import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useMemo } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TokenInputOption, TokenInputProps } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getDisplayNameForChainId,
  getFallbackImage,
  toAccessibleImageUrl,
  tokensEqual,
  transformIpfsUrlToHttpsIfNecessary,
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ChainLogo } from '../chain/ChainLogo'
import { FilterableItemPopup } from '../popup'
import { Tooltip } from '../tooltip'
import { NumberInput } from './NumberInput'

/**
 * A component for specifying an amount and a token. This should be used
 * whenever an amount of a variable choice token is needed. See example usage in
 * the Spend action component.
 */
export const TokenInput = <
  T extends TokenInputOption,
  FV extends FieldValues = FieldValues,
  FieldName extends Path<FV> = Path<FV>
>({
  // The fields that control the amount input.
  amount: amountField,
  // The available tokens and selection handlers for the token. Various
  // use-cases exist for this component, so the token selection is left up to
  // the caller instead of being handled internally like the amount field.
  tokens,
  onSelectToken,
  selectedToken: _selectedToken,
  // Fallback when no token is selected. If nothing is provided, a placeholder
  // text will be shown instead ("Select token").
  tokenFallback,
  // Whether or not the inputs are editable. This is different from read-only
  // below. Disabled is a more temporary input state, potentially due to a
  // dependency on some other field, for example.
  disabled,
  // If read-only, the inputs will be replaced with a nice display of the
  // selected token and amount.
  readOnly,
  // This only applies to the amount field.
  required = true,
  // Optional additional class names for the container.
  containerClassName,
  showChainImage,
}: TokenInputProps<T, FV, FieldName>) => {
  const { t } = useTranslation()

  const selectedToken =
    tokens.loading || !_selectedToken
      ? undefined
      : tokens.data.find((token) => tokensEqual(token, _selectedToken))

  const amount = amountField
    ? amountField.convertMicroDenom
      ? convertMicroDenomToDenomWithDecimals(
          amountField.watch(amountField.fieldName),
          selectedToken?.decimals ?? 0
        )
      : Number(amountField.watch(amountField.fieldName))
    : 0

  // All tokens from same chain.
  const allTokensOnSameChain =
    !tokens.loading &&
    tokens.data.every((token) => token.chainId === tokens.data[0].chainId)

  const selectedTokenDisplay = useMemo(
    () =>
      selectedToken ? (
        <div className="flex min-w-0 flex-row items-center gap-2">
          <Tooltip
            title={t('info.tokenOnChain', {
              token: selectedToken.symbol,
              chain: getDisplayNameForChainId(selectedToken.chainId),
            })}
          >
            <div
              className={clsx(
                'h-6 w-6 shrink-0 rounded-full bg-cover bg-center',
                showChainImage && 'relative'
              )}
              style={{
                backgroundImage: `url(${toAccessibleImageUrl(
                  selectedToken.imageUrl ||
                    getFallbackImage(selectedToken.denomOrAddress)
                )})`,
              }}
            >
              {showChainImage && (
                <ChainLogo
                  chainId={selectedToken.chainId}
                  className="absolute -bottom-1 -right-1"
                  size={14}
                />
              )}
            </div>
          </Tooltip>

          <p className="min-w-[4rem] grow truncate text-left">
            {readOnly &&
              amountField &&
              amount.toLocaleString(undefined, {
                // Show as many decimals as possible (max is 20).
                maximumFractionDigits: 20,
              }) +
                (amountField.unit ? amountField.unit : '') +
                ' $'}
            {selectedToken.symbol}
          </p>
        </div>
      ) : (
        tokenFallback ?? (
          <p className="text-text-secondary">
            {readOnly
              ? t('info.token', { count: amount })
              : disabled
              ? t('info.noTokenSelected')
              : t('button.selectToken')}
          </p>
        )
      ),
    [
      amount,
      amountField,
      disabled,
      readOnly,
      selectedToken,
      showChainImage,
      t,
      tokenFallback,
    ]
  )

  // Disable if there is only one token to choose from and the currently
  // selected token is equal to it.
  const selectDisabled =
    disabled ||
    (!tokens.loading &&
      tokens.data.length === 1 &&
      selectedToken &&
      tokensEqual(tokens.data[0], selectedToken))

  return (
    <div
      className={clsx(
        'flex max-w-md flex-row flex-wrap items-stretch gap-1',
        containerClassName
      )}
    >
      {readOnly ? (
        selectedTokenDisplay
      ) : (
        <>
          {amountField && (
            <NumberInput
              containerClassName="min-w-[12rem] grow basis-[12rem]"
              disabled={disabled || !selectedToken}
              error={amountField.error}
              fieldName={amountField.fieldName}
              max={amountField.max}
              min={amountField.min}
              register={amountField.register}
              setValue={(fieldName, value, options) =>
                amountField.setValue(fieldName, value as any, options)
              }
              step={amountField.step}
              transformDecimals={
                amountField.convertMicroDenom
                  ? selectedToken?.decimals
                  : undefined
              }
              unit={amountField.unit}
              validation={[
                amountField.min ? validatePositive : validateNonNegative,

                ...(required ? [validateRequired] : []),
                ...(amountField.validations ?? []),
              ]}
              watch={amountField.watch}
            />
          )}

          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={
              tokens.loading
                ? []
                : tokens.data.map((token, index) => ({
                    key: index + token.denomOrAddress,
                    label: token.symbol,
                    iconUrl: transformIpfsUrlToHttpsIfNecessary(
                      token.imageUrl || getFallbackImage(token.denomOrAddress)
                    ),
                    ...token,
                    rightNode: (
                      <p className="caption-text max-w-[5rem] truncate">
                        {allTokensOnSameChain
                          ? token.denomOrAddress
                          : getDisplayNameForChainId(token.chainId)}
                      </p>
                    ),
                    iconClassName: '!h-8 !w-8',
                    contentContainerClassName: '!gap-3',
                  }))
            }
            onSelect={(token) => onSelectToken(token as T)}
            searchPlaceholder={t('info.searchForToken')}
            trigger={{
              type: 'button',
              props: {
                className: 'min-w-[10rem] grow basis-[10rem]',
                contentContainerClassName:
                  'justify-between text-icon-primary !gap-4',
                disabled: selectDisabled,
                loading: tokens.loading,
                size: 'lg',
                variant: 'ghost_outline',
                children: (
                  <>
                    {selectedTokenDisplay}

                    {!selectDisabled && <ArrowDropDown className="!h-6 !w-6" />}
                  </>
                ),
              },
            }}
          />
        </>
      )}
    </div>
  )
}

const FILTERABLE_KEYS = ['key', 'label', 'description']
