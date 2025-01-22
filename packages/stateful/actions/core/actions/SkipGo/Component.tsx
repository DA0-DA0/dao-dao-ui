import type { MsgsDirectResponse } from '@skip-go/client'
import Image from 'next/image'
import { ComponentType, RefAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  AccountSelector,
  ChainPickerPopup,
  ChainProvider,
  InputErrorMessage,
  InputLabel,
  NumericInput,
  PercentButton,
  SelectInput,
  AddressInput as StatelessAddressInput,
  StatusCard,
  TokenAmountDisplay,
  TokenInput,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  AnyChainSkip,
  DurationUnitsValuesTimeOnly,
  DurationWithUnits,
  GenericToken,
  GenericTokenBalanceWithOwner,
  LoadingDataWithError,
  TokenType,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getChainForChainId,
  isTokenType,
  isValidBech32Address,
  makeValidateAddress,
  maybeGetChainForChainId,
  tokensEqual,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type SkipGoData = {
  /**
   * Source account and token.
   */
  from: {
    /**
     * Chain ID.
     */
    chainId: string
    /**
     * Address.
     */
    address: string
    /**
     * Token type.
     */
    type: TokenType
    /**
     * Token denom or address.
     */
    denomOrAddress: string
  }
  /**
   * Destination account and token.
   */
  to: {
    /**
     * Destination chain ID.
     */
    chainId: string
    /**
     * Destination address.
     */
    address: string
    /**
     * Token type.
     */
    type: TokenType
    /**
     * Token denom or address.
     */
    denomOrAddress: string
  }
  /**
   * Amount to send.
   */
  amount: string
  /**
   * Relative IBC transfer timeout after max voting period.
   */
  ibcTimeout: DurationWithUnits
  /**
   * Generated messages and route response. Needed for encoding.
   */
  skipGoResponse?: MsgsDirectResponse
}

export type SkipGoOptions = {
  /**
   * Skip chains.
   */
  chains: LoadingDataWithError<AnyChainSkip[]>
  /**
   * Skip assets.
   */
  assets: LoadingDataWithError<Record<string, GenericToken[]>>
  /**
   * The tokens in all accounts controlled by the spender.
   */
  tokens: LoadingDataWithError<GenericTokenBalanceWithOwner[]>
  /**
   * The current token input. May or may not be in the list of tokens above, if
   * they entered a custom token.
   */
  token: LoadingDataWithError<GenericToken>
  /**
   * Stateful address input component.
   */
  AddressInput: ComponentType<
    AddressInputProps<SkipGoData> & RefAttributes<HTMLDivElement>
  >
  /**
   * Hide the destination chain/address picker.
   */
  noChangeDestination?: boolean
  /**
   * Whether or not the proposal max voting period is in blocks.
   */
  proposalModuleMaxVotingPeriodInBlocks: boolean
}

export const SkipGoIcon = () => (
  // eslint-disable-next-line i18next/no-literal-string
  <Image alt="Skip Go" height={32} src="/skipgo.png" width={32} />
)

export const SkipGoComponent: ActionComponent<SkipGoOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    chains,
    assets,
    tokens,
    token,
    AddressInput,
    noChangeDestination,
    proposalModuleMaxVotingPeriodInBlocks,
  },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { watch, setValue, getValues, register } = useFormContext<SkipGoData>()

  const from = watch((fieldNamePrefix + 'from') as 'from')
  const to = watch((fieldNamePrefix + 'to') as 'to')
  const amount = watch((fieldNamePrefix + 'amount') as 'amount')
  const ibcTimeout = watch((fieldNamePrefix + 'ibcTimeout') as 'ibcTimeout')
  const skipGoResponse = watch(
    (fieldNamePrefix + 'skipGoResponse') as 'skipGoResponse'
  )

  // Destination chain may not exist if not a Cosmos chain.
  const toChain = maybeGetChainForChainId(to.chainId)
  const toChainAssets: LoadingDataWithError<GenericToken[]> =
    assets.loading || assets.errored
      ? assets
      : {
          loading: false,
          errored: false,
          updating: assets.updating,
          data: assets.data[to.chainId],
        }
  const selectedOutputAsset: LoadingDataWithError<GenericToken | undefined> =
    toChainAssets.loading || toChainAssets.errored
      ? toChainAssets
      : {
          loading: false,
          errored: false,
          updating: toChainAssets.updating,
          data: toChainAssets.data.find((a) => tokensEqual(a, to)),
        }

  const chainAccounts = context.accounts.filter(
    (a) => a.chainId === from.chainId
  )
  const selectedAccount = chainAccounts.find((a) => a.address === from.address)

  // If entering a custom token, we need to show a list of from chains/addresses
  // that the DAO controls. Usually that information is retrieved from the token
  // list.
  const [customToken, setCustomToken] = useState(false)
  const loadedCustomToken =
    customToken &&
    !token.loading &&
    !token.errored &&
    token.data.chainId === from.chainId &&
    token.data.type === from.type &&
    token.data.denomOrAddress === from.denomOrAddress &&
    token.data.decimals > 0

  // Don't select token if entering a custom token.
  const selectedToken =
    customToken || tokens.loading || tokens.errored
      ? undefined
      : tokens.data.find(
          ({ owner, token }) =>
            owner.address === from.address &&
            token.chainId === from.chainId &&
            token.denomOrAddress === from.denomOrAddress &&
            token.type === from.type
        )

  const decimals = loadedCustomToken
    ? token.data.decimals
    : selectedToken?.token.decimals || 0

  const balance = HugeDecimal.from(selectedToken?.balance ?? 0)

  // A warning if the denom was not found in the treasury or the amount is too
  // high. We don't want to make this an error because often people want to
  // spend funds that a previous action makes available, so just show a warning.
  const symbol = selectedToken?.token.symbol || from.denomOrAddress
  const warning =
    customToken || !isCreating || tokens.loading || !from.denomOrAddress
      ? undefined
      : !selectedToken
        ? t('error.unknownDenom', { denom: from.denomOrAddress })
        : balance.toHumanReadable(decimals).lt(amount)
          ? t('error.insufficientFundsWarning', {
              amount: balance.toInternationalizedHumanReadableString({
                decimals,
              }),
              tokenSymbol: symbol,
            })
          : undefined

  return (
    <>
      <InputLabel className="-mb-2" name={t('form.from')} />

      <div className="flex min-w-0 flex-row flex-wrap items-stretch gap-1">
        <AccountSelector
          accounts={context.accounts}
          className="w-auto grow"
          disabled={
            // Enable account picker if entering custom token since we can't
            // automatically determine where it's coming from.
            !isCreating || !customToken
          }
          onSelect={(account) => {
            setValue(
              (fieldNamePrefix + 'from.chainId') as 'from.chainId',
              account.chainId
            )
            setValue(
              (fieldNamePrefix + 'from.address') as 'from.address',
              account.address
            )
          }}
          selectedAccount={selectedAccount}
        />

        <TokenInput
          allowCustomToken
          amount={{
            watch,
            setValue,
            getValues,
            register,
            fieldName: (fieldNamePrefix + 'amount') as 'amount',
            error: errors?.amount,
            min: HugeDecimal.one.toHumanReadableNumber(decimals),
            step: HugeDecimal.one.toHumanReadableNumber(decimals),
            // For custom token, show unit if loaded successfully.
            unit: loadedCustomToken ? token.data.symbol : undefined,
            unitIconUrl: loadedCustomToken
              ? token.data.imageUrl || undefined
              : undefined,
            unitClassName: '!text-text-primary',
          }}
          containerClassName="grow !max-w-full"
          onCustomTokenChange={(custom) => {
            setValue(
              (fieldNamePrefix +
                'from.denomOrAddress') as 'from.denomOrAddress',
              custom
            )
            // If denom entered is a valid contract address, it's most
            // likely a cw20 token. I've never seen a native denom that was
            // formatted like an address.
            setValue(
              (fieldNamePrefix + 'from.type') as 'from.type',
              isValidBech32Address(
                custom,
                getChainForChainId(from.chainId).bech32Prefix
              )
                ? TokenType.Cw20
                : TokenType.Native
            )
          }}
          onSelectToken={(token) => {
            setCustomToken(!token)

            // Custom token
            if (!token) {
              return
            }

            // If chain changes and the dest chain is the same as the source,
            // switch it.
            if (from.chainId === to.chainId && token.chainId !== from.chainId) {
              setValue(
                (fieldNamePrefix + 'to.chainId') as 'to.chainId',
                token.chainId
              )
            }

            setValue(
              (fieldNamePrefix + 'from.chainId') as 'from.chainId',
              token.chainId
            )
            setValue(
              (fieldNamePrefix + 'from.address') as 'from.address',
              token.owner.address
            )

            setValue(
              (fieldNamePrefix +
                'from.denomOrAddress') as 'from.denomOrAddress',
              token.denomOrAddress
            )
            setValue(
              (fieldNamePrefix + 'from.type') as 'from.type',
              isTokenType(token.type) ? token.type : TokenType.Native
            )

            // If token is cw20, set destination chain to same as source.
            if (token.type === TokenType.Cw20) {
              setValue(
                (fieldNamePrefix + 'to.chainId') as 'to.chainId',
                token.chainId
              )
            }
          }}
          readOnly={!isCreating}
          selectedToken={selectedToken?.token}
          tokens={
            tokens.loading || tokens.errored
              ? { loading: true }
              : {
                  loading: false,
                  data: tokens.data.map(({ owner, balance, token }) => ({
                    ...token,
                    owner,
                    description:
                      t('title.balance') +
                      ': ' +
                      HugeDecimal.from(
                        balance
                      ).toInternationalizedHumanReadableString({
                        decimals: token.decimals,
                      }),
                  })),
                }
          }
        />
      </div>

      {isCreating && !!(errors?.amount || warning) && (
        <div className="-mt-4 -ml-1 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={warning} warning />
        </div>
      )}

      {
        // Show custom token load status and decimal conversion info once a
        // denom has started being entered.
        isCreating &&
          customToken &&
          !!from.denomOrAddress &&
          (!token.loading && !token.updating ? (
            loadedCustomToken ? (
              <StatusCard
                className="-mt-2"
                content={t('info.spendActionCustomTokenDecimalsFound', {
                  tokenSymbol: token.data.symbol,
                  decimals: token.data.decimals,
                })}
                size="xs"
                style="success"
              />
            ) : (
              <StatusCard
                className="-mt-2"
                content={t('error.customTokenNoDecimals')}
                size="xs"
                style="warning"
              />
            )
          ) : (
            <StatusCard
              className="-mt-2"
              content={t('info.loadingCustomToken')}
              size="xs"
              style="loading"
            />
          ))
      }

      {selectedToken && isCreating && (
        <div className="flex flex-row justify-between flex-wrap items-center -mt-2 mb-2 gap-x-8 gap-y-2">
          <div className="flex flex-row items-center gap-2">
            <p className="caption-text">{t('info.yourBalance')}:</p>

            <TokenAmountDisplay
              amount={balance}
              decimals={selectedToken.token.decimals}
              iconUrl={selectedToken.token.imageUrl}
              onClick={() =>
                setValue(
                  (fieldNamePrefix + 'amount') as 'amount',
                  balance.toHumanReadableString(decimals)
                )
              }
              showFullAmount
              symbol={selectedToken.token.symbol}
            />
          </div>

          {balance.isPositive() && (
            <div className="grid grid-cols-5 gap-1">
              {[10, 25, 50, 75, 100].map((percent) => (
                <PercentButton
                  key={percent}
                  amount={HugeDecimal.fromHumanReadable(amount, decimals)}
                  loadingMax={{ loading: false, data: balance }}
                  percent={percent}
                  setAmount={(amount) =>
                    setValue(
                      (fieldNamePrefix + 'amount') as 'amount',
                      amount.toHumanReadableString(decimals)
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      <InputLabel className="-mb-2" name={t('form.to')} />

      <div className="flex min-w-0 flex-row items-stretch gap-1">
        <ChainPickerPopup
          chains={
            chains.loading || chains.errored
              ? chains
              : {
                  type: 'custom_chains',
                  chains: chains.data,
                }
          }
          disabled={!isCreating || noChangeDestination}
          onSelect={(chainId) => {
            // Type-check. Should never happen.
            if (!chainId) {
              return
            }

            setValue((fieldNamePrefix + 'to.chainId') as 'to.chainId', chainId)
          }}
          selectedChainId={to.chainId}
        />

        <TokenInput
          containerClassName="grow"
          onSelectToken={(token) => {
            setValue(
              (fieldNamePrefix + 'to.chainId') as 'to.chainId',
              token.chainId
            )
            setValue(
              (fieldNamePrefix + 'to.type') as 'to.type',
              isTokenType(token.type) ? token.type : TokenType.Native
            )
            setValue(
              (fieldNamePrefix + 'to.denomOrAddress') as 'to.denomOrAddress',
              token.denomOrAddress
            )
          }}
          readOnly={!isCreating || noChangeDestination}
          selectedToken={
            selectedOutputAsset.loading || selectedOutputAsset.errored
              ? undefined
              : selectedOutputAsset.data
          }
          tokens={toChainAssets}
        />

        <div className="flex grow flex-row items-stretch">
          {/* Only show stateful address input which can search and autofill addreses on Cosmos chains. */}
          {toChain?.chainRegistry?.chain_type === 'cosmos' ||
          toChain?.skipChain?.chain_type === 'cosmos' ? (
            <ChainProvider chainId={to.chainId}>
              <AddressInput
                containerClassName="grow"
                disabled={!isCreating || noChangeDestination}
                error={errors?.to?.address}
                fieldName={(fieldNamePrefix + 'to.address') as 'to.address'}
                register={register}
                validation={[
                  validateRequired,
                  makeValidateAddress(toChain.bech32Prefix),
                ]}
              />
            </ChainProvider>
          ) : (
            // Address input without any fancy chain and address validation.
            <StatelessAddressInput
              containerClassName="grow"
              disabled={!isCreating || noChangeDestination}
              error={errors?.to?.address}
              fieldName={(fieldNamePrefix + 'to.address') as 'to.address'}
              register={register}
              validation={[validateRequired]}
            />
          )}
        </div>
      </div>

      <InputErrorMessage
        className="-mt-4"
        error={chains.errored ? chains.error : errors?.to?.address}
      />

      <div className="mt-2 flex flex-col gap-2">
        <InputLabel
          name={t('form.ibcTimeout')}
          tooltip={t('form.ibcTimeoutTooltip', {
            context: proposalModuleMaxVotingPeriodInBlocks
              ? 'blocks'
              : undefined,
          })}
        />

        <div className="flex flex-row gap-1">
          <NumericInput
            disabled={!isCreating}
            error={errors?.ibcTimeout?.value}
            fieldName={
              (fieldNamePrefix + 'ibcTimeout.value') as 'ibcTimeout.value'
            }
            getValues={getValues}
            min={1}
            numericValue
            register={register}
            setValue={setValue}
            sizing="md"
            step={1}
            unit={
              isCreating
                ? undefined
                : t(`unit.${ibcTimeout?.units}`, {
                    count: ibcTimeout?.value,
                  }).toLocaleLowerCase()
            }
            validation={[validateRequired, validatePositive]}
          />

          <SelectInput
            disabled={!isCreating}
            error={errors?.ibcTimeout?.units}
            fieldName={
              (fieldNamePrefix + 'ibcTimeout.units') as 'ibcTimeout.units'
            }
            register={register}
            validation={[validateRequired]}
          >
            {DurationUnitsValuesTimeOnly.map((type, idx) => (
              <option key={idx} value={type}>
                {t(`unit.${type}`, {
                  count: ibcTimeout?.value,
                }).toLocaleLowerCase()}
              </option>
            ))}
          </SelectInput>
        </div>

        <InputErrorMessage
          error={errors?.ibcTimeout?.value || errors?.ibcTimeout?.units}
        />
      </div>

      {skipGoResponse &&
        !selectedOutputAsset.loading &&
        !selectedOutputAsset.errored &&
        !selectedOutputAsset.updating &&
        selectedOutputAsset.data && (
          <div className="flex flex-col gap-2 mt-1">
            <InputLabel name={t('form.outputAmount')} />

            <TokenAmountDisplay
              amount={HugeDecimal.from(skipGoResponse.route.amountOut)}
              decimals={selectedOutputAsset.data.decimals}
              iconUrl={selectedOutputAsset.data.imageUrl}
              showFullAmount
              symbol={selectedOutputAsset.data.symbol}
            />
          </div>
        )}

      {!!errors?.skipGoResponse?.message && (
        <StatusCard
          className="mt-4 self-start"
          content={errors.skipGoResponse.message}
          style="error"
        />
      )}
    </>
  )
}
