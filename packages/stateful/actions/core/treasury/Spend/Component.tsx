import { fromBech32, toBech32 } from '@cosmjs/encoding'
import {
  ArrowDropDown,
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { ibc } from 'chain-registry'
import clsx from 'clsx'
import {
  ComponentType,
  RefAttributes,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  FilterableItemPopup,
  InputErrorMessage,
  TokenAmountDisplay,
  TokenInput,
  useDetectWrap,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GenericTokenBalance,
  LoadingData,
} from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  CHAIN_ID,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  getChainForChainId,
  getChainForChainName,
  getImageUrlForChainId,
  isValidWalletAddress,
  makeValidateAddress,
  toAccessibleImageUrl,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export interface SpendData {
  chainId: string
  // If same as chainId, then normal spend or CW20 transfer. Otherwise, IBC
  // transfer.
  toChainId: string
  to: string
  amount: number
  denom: string

  _error?: string
}

export interface SpendOptions {
  tokens: LoadingData<GenericTokenBalance[]>
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<
    AddressInputProps<SpendData> & RefAttributes<HTMLDivElement>
  >
}

export const SpendComponent: ActionComponent<SpendOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { tokens, AddressInput },
}) => {
  const { t } = useTranslation()
  const {
    address: coreAddress,
    chain: currentChain,
    context,
  } = useActionOptions()

  const { register, watch, setValue, setError, clearErrors } =
    useFormContext<SpendData>()

  const spendChainId =
    watch((fieldNamePrefix + 'chainId') as 'chainId') || CHAIN_ID
  const spendAmount = watch((fieldNamePrefix + 'amount') as 'amount')
  const spendDenom = watch((fieldNamePrefix + 'denom') as 'denom')
  const recipient = watch((fieldNamePrefix + 'to') as 'to')

  const toChainId = watch((fieldNamePrefix + 'toChainId') as 'toChainId')
  const toChain = getChainForChainId(toChainId)

  // On destination chain ID change, update address intelligently.
  useEffect(() => {
    let newRecipient = ''
    try {
      const { bech32_prefix: bech32Prefix } = getChainForChainId(toChainId)

      // Convert wallet address to destination chain's format.
      if (
        !recipient.startsWith(bech32Prefix) &&
        isValidWalletAddress(recipient)
      ) {
        newRecipient = toBech32(bech32Prefix, fromBech32(recipient).data)
      }
      // Convert DAO address or its polytone proxy to appropriate address.
      else if (
        context.type === ActionContextType.Dao &&
        (recipient === coreAddress ||
          Object.values(context.info.polytoneProxies).includes(recipient))
      ) {
        newRecipient =
          toChainId === currentChain.chain_id
            ? coreAddress
            : toChainId in context.info.polytoneProxies
            ? context.info.polytoneProxies[toChainId]
            : ''
      }
    } catch {
      // Ignore error.
    }

    if (newRecipient !== recipient) {
      setValue((fieldNamePrefix + 'to') as 'to', newRecipient)
    }
  }, [
    context,
    coreAddress,
    currentChain.chain_id,
    fieldNamePrefix,
    recipient,
    setValue,
    toChainId,
  ])

  const possibleDestinationChains = useMemo(() => {
    const spendChain = getChainForChainId(spendChainId)
    return [
      spendChain,
      ...ibc
        .filter(
          ({ chain_1, chain_2, channels }) =>
            // Either chain is the source spend chain.
            (chain_1.chain_name === spendChain.chain_name ||
              chain_2.chain_name === spendChain.chain_name) &&
            // An ics20 transfer channel exists.
            channels.some(
              ({ chain_1, chain_2, version }) =>
                version === 'ics20-1' &&
                chain_1.port_id === 'transfer' &&
                chain_2.port_id === 'transfer'
            )
        )
        .map(({ chain_1, chain_2 }) => {
          const otherChain =
            chain_1.chain_name === spendChain.chain_name ? chain_2 : chain_1
          return getChainForChainName(otherChain.chain_name)
        }),
    ]
  }, [spendChainId])

  const validatePossibleSpend = useCallback(
    (chainId: string, denom: string, amount: number): string | boolean => {
      if (tokens.loading) {
        return true
      }

      const insufficientBalanceI18nKey =
        context.type === ActionContextType.Dao
          ? 'error.cantSpendMoreThanTreasury'
          : 'error.insufficientWalletBalance'

      const tokenBalance = tokens.data.find(
        ({ token }) =>
          token.chainId === chainId && token.denomOrAddress === denom
      )
      if (tokenBalance) {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          tokenBalance.token.decimals
        )

        return (
          microAmount <= Number(tokenBalance.balance) ||
          t(insufficientBalanceI18nKey, {
            amount: convertMicroDenomToDenomWithDecimals(
              tokenBalance.balance,
              tokenBalance.token.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: tokenBalance.token.decimals,
            }),
            tokenSymbol: tokenBalance.token.symbol,
          })
        )
      }

      return t('error.unknownDenom', { denom })
    },
    [context.type, t, tokens]
  )

  // Update amount+denom combo error each time either field is updated
  // instead of setting errors individually on each field. Since we only
  // show one or the other and can't detect which error is newer, this
  // would lead to the error not updating if amount set an error and then
  // denom was changed.
  useEffect(() => {
    // Prevent infinite loops by not setting errors if already set, and only
    // clearing errors unless already set.
    const currentError = errors?._error

    if (!spendDenom || !spendAmount) {
      if (currentError) {
        clearErrors((fieldNamePrefix + '_error') as '_error')
      }
      return
    }

    const validation = validatePossibleSpend(
      spendChainId,
      spendDenom,
      spendAmount
    )
    if (validation === true) {
      if (currentError) {
        clearErrors((fieldNamePrefix + '_error') as '_error')
      }
    } else if (typeof validation === 'string') {
      if (!currentError || currentError.message !== validation) {
        setError((fieldNamePrefix + '_error') as '_error', {
          type: 'custom',
          message: validation,
        })
      }
    }
  }, [
    spendAmount,
    spendDenom,
    setError,
    clearErrors,
    validatePossibleSpend,
    fieldNamePrefix,
    errors?._error,
    spendChainId,
  ])

  const selectedToken = tokens.loading
    ? undefined
    : tokens.data.find(
        ({ token }) =>
          token.chainId === spendChainId && token.denomOrAddress === spendDenom
      )
  const balance = convertMicroDenomToDenomWithDecimals(
    selectedToken?.balance ?? 0,
    selectedToken?.token.decimals ?? 0
  )

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  const {
    containerRef: toContainerRef,
    childRef: toChildRef,
    wrapped: toWrapped,
  } = useDetectWrap()

  return (
    <>
      <div
        className="flex min-w-0 flex-row flex-wrap items-stretch justify-between gap-x-3 gap-y-1"
        ref={containerRef}
      >
        <TokenInput
          amountError={errors?.amount}
          amountFieldName={(fieldNamePrefix + 'amount') as 'amount'}
          amountMax={balance}
          amountMin={convertMicroDenomToDenomWithDecimals(
            1,
            selectedToken?.token.decimals ?? 0
          )}
          amountStep={convertMicroDenomToDenomWithDecimals(
            1,
            selectedToken?.token.decimals ?? 0
          )}
          onSelectToken={({ chainId, denomOrAddress }) => {
            // If chain changes and the dest chain is the same, switch it.
            if (spendChainId === toChainId && chainId !== spendChainId) {
              setValue((fieldNamePrefix + 'toChainId') as 'toChainId', chainId)
            }

            setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            setValue((fieldNamePrefix + 'denom') as 'denom', denomOrAddress)
          }}
          readOnly={!isCreating}
          register={register}
          selectedToken={selectedToken?.token}
          setValue={setValue}
          tokens={
            tokens.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: tokens.data.map(({ balance, token }) => ({
                    ...token,
                    description:
                      t('title.balance') +
                      ': ' +
                      convertMicroDenomToDenomWithDecimals(
                        balance,
                        token.decimals
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: token.decimals,
                      }),
                  })),
                }
          }
          watch={watch}
        />

        <div
          className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3"
          ref={childRef}
        >
          <div
            className={clsx('flex flex-row items-center', wrapped && 'pl-1')}
          >
            <Icon className="!h-6 !w-6 text-text-secondary" />
          </div>

          <div
            className="flex grow flex-row flex-wrap items-stretch gap-1"
            ref={toContainerRef}
          >
            {(isCreating || spendChainId !== toChainId) && (
              <FilterableItemPopup
                filterableItemKeys={FILTERABLE_KEYS}
                items={possibleDestinationChains.map((chain) => ({
                  key: chain.chain_id,
                  label: chain.pretty_name,
                  iconUrl: getImageUrlForChainId(chain.chain_id),
                  iconClassName: '!h-8 !w-8',
                  contentContainerClassName: '!gap-3',
                }))}
                onSelect={({ key }) =>
                  setValue((fieldNamePrefix + 'toChainId') as 'toChainId', key)
                }
                searchPlaceholder={t('info.searchForChain')}
                trigger={{
                  type: 'button',
                  props: {
                    className: toWrapped ? 'grow' : undefined,
                    contentContainerClassName:
                      'justify-between text-icon-primary !gap-4',
                    disabled: !isCreating,
                    size: 'lg',
                    variant: 'ghost_outline',
                    children: (
                      <>
                        <div className="flex flex-row items-center gap-2">
                          <div
                            className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${toAccessibleImageUrl(
                                getImageUrlForChainId(toChainId)
                              )})`,
                            }}
                          />

                          <p>{toChain.pretty_name}</p>
                        </div>

                        {isCreating && <ArrowDropDown className="!h-6 !w-6" />}
                      </>
                    ),
                  },
                }}
              />
            )}

            {/* Change search address and placeholder based on destination chain. */}
            <ChainProvider chainId={toChainId}>
              <div
                className="flex grow flex-row items-stretch"
                ref={toChildRef}
              >
                <AddressInput
                  containerClassName="grow"
                  disabled={!isCreating}
                  error={errors?.to}
                  fieldName={(fieldNamePrefix + 'to') as 'to'}
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateAddress(toChain.bech32_prefix),
                  ]}
                />
              </div>
            </ChainProvider>
          </div>
        </div>
      </div>

      {(errors?.amount || errors?.denom || errors?.to || errors?._error) && (
        <div className="-mt-4 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?.to} />
          <InputErrorMessage error={errors?._error} />
        </div>
      )}

      {selectedToken && isCreating && (
        <div className="-mt-2 flex flex-row items-center gap-2">
          <p className="secondary-text">{t('title.balance')}:</p>

          <TokenAmountDisplay
            amount={balance}
            decimals={selectedToken.token.decimals}
            iconUrl={selectedToken.token.imageUrl}
            showFullAmount
            symbol={selectedToken.token.symbol}
          />
        </div>
      )}
    </>
  )
}

const FILTERABLE_KEYS = ['key', 'label']
