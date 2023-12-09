import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { MultiChainMsg } from '@skip-router/core'
import clsx from 'clsx'
import { ComponentType, RefAttributes, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainLogo,
  ChainProvider,
  IbcDestinationChainPicker,
  InputErrorMessage,
  InputLabel,
  Loader,
  TokenAmountDisplay,
  TokenInput,
  WarningCard,
  useDetectWrap,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  Entity,
  EntityType,
  GenericTokenBalanceWithOwner,
  LoadingData,
  LoadingDataWithError,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  getAccountAddress,
  getChainForChainId,
  getDisplayNameForChainId,
  getSupportedChainConfig,
  makeValidateAddress,
  processError,
  transformBech32Address,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export interface SpendData {
  fromChainId: string
  // If same as chainId, then normal spend or CW20 transfer. Otherwise, IBC
  // transfer.
  toChainId: string
  // Address with the tokens. This is needed since there may be multiple
  // accounts controlled by the DAO on the same chain.
  from: string
  to: string
  amount: number
  denom: string

  _error?: string

  // Defined once loaded for IBC transfers. Needed for transforming.
  _skipIbcTransferMsg?: LoadingDataWithError<MultiChainMsg>

  // Loaded from IBC transfer message on decode.
  _ibcData?: {
    sourceChannel: string
    // Loaded for packet-forwarding-middleware detection after creation (likely
    // created using Skip's router API).
    pfmMemo?: string
  }
}

export interface SpendOptions {
  tokens: LoadingData<GenericTokenBalanceWithOwner[]>
  currentEntity: Entity | undefined
  // If this is an IBC transfer, this is the path of chains.
  ibcPath: LoadingDataWithError<string[]>
  // If this is an IBC transfer and a multi-TX route exists that unwinds the
  // tokens correctly but doesn't use PFM, this is the better path.
  betterNonPfmIbcPath: LoadingData<string[] | undefined>
  // If this is an IBC transfer, these are the chains with missing accounts.
  missingAccountChainIds?: string[]
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<
    AddressInputProps<SpendData> & RefAttributes<HTMLDivElement>
  >
}

export const SpendComponent: ActionComponent<SpendOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    tokens,
    currentEntity,
    ibcPath,
    betterNonPfmIbcPath,
    missingAccountChainIds,
    AddressInput,
  },
  addAction,
  remove,
}) => {
  const { t } = useTranslation()
  const {
    context,
    chain: { chain_id: mainChainId },
  } = useActionOptions()

  const { register, watch, setValue, setError, clearErrors } =
    useFormContext<SpendData>()

  const spendChainId = watch((fieldNamePrefix + 'fromChainId') as 'fromChainId')
  const spendAmount = watch((fieldNamePrefix + 'amount') as 'amount')
  const spendDenom = watch((fieldNamePrefix + 'denom') as 'denom')
  const from = watch((fieldNamePrefix + 'from') as 'from')
  const recipient = watch((fieldNamePrefix + 'to') as 'to')

  const toChainId = watch((fieldNamePrefix + 'toChainId') as 'toChainId')
  const toChain = getChainForChainId(toChainId)

  // IBC transfer if destination chain ID is different from source chain ID.
  const isIbc = spendChainId !== toChainId

  // On destination chain ID change, update address intelligently.
  useEffect(() => {
    // If no current entity, or the loaded entity is different from entered
    // recipient, do nothing. Only update address intelligently if we have
    // loaded the entity for the entered recipient.
    if (
      !currentEntity ||
      !recipient ||
      // Do nothing for module accounts as they only exist on the current chain.
      currentEntity.type === EntityType.Module ||
      // Wallet on current chain
      (currentEntity.type === EntityType.Wallet ||
      // DAO on native chain (core contract address).
      !currentEntity.polytoneProxy
        ? recipient !== currentEntity.address
        : // DAO on other chain (polytone proxy address).
          recipient !== currentEntity.polytoneProxy.address)
    ) {
      return
    }

    let newRecipient: string

    // Convert wallet address to destination chain's format.
    if (currentEntity.type === EntityType.Wallet) {
      newRecipient = transformBech32Address(
        currentEntity.address,
        toChain.chain_id
      )
    }
    // Get DAO core address or its corresponding polytone proxy. Clear if no
    // account on the destination chain.
    else {
      newRecipient =
        getAccountAddress({
          accounts: currentEntity.daoInfo.accounts,
          chainId: toChain.chain_id,
        }) || ''
    }

    if (newRecipient !== recipient) {
      setValue((fieldNamePrefix + 'to') as 'to', newRecipient)
    }
  }, [context, currentEntity, fieldNamePrefix, recipient, setValue, toChain])

  const validatePossibleSpend = useCallback(
    (
      from: string,
      chainId: string,
      denom: string,
      amount: number
    ): string | boolean => {
      if (tokens.loading) {
        return true
      }

      const insufficientBalanceI18nKey =
        context.type === ActionContextType.Wallet
          ? 'error.insufficientWalletBalance'
          : 'error.cantSpendMoreThanTreasury'

      const tokenBalance = tokens.data.find(
        ({ owner, token }) =>
          owner.address === from &&
          token.chainId === chainId &&
          token.denomOrAddress === denom
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

  // Update amount+denom combo error each time either field is updated instead
  // of setting errors individually on each field. Since we only show one or the
  // other and can't detect which error is newer, this would lead to the error
  // not updating if amount set an error and then denom was changed.
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
      from,
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
    from,
  ])

  const selectedToken = tokens.loading
    ? undefined
    : tokens.data.find(
        ({ owner, token }) =>
          owner.address === from &&
          token.chainId === spendChainId &&
          token.denomOrAddress === spendDenom
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
          amount={{
            watch,
            setValue,
            register,
            fieldName: (fieldNamePrefix + 'amount') as 'amount',
            error: errors?.amount,
            min: convertMicroDenomToDenomWithDecimals(
              1,
              selectedToken?.token.decimals ?? 0
            ),
            max: balance,
            step: convertMicroDenomToDenomWithDecimals(
              1,
              selectedToken?.token.decimals ?? 0
            ),
          }}
          onSelectToken={({ owner, chainId, denomOrAddress }) => {
            // If chain changes and the dest chain is the same, switch it.
            if (spendChainId === toChainId && chainId !== spendChainId) {
              setValue((fieldNamePrefix + 'toChainId') as 'toChainId', chainId)
            }

            setValue(
              (fieldNamePrefix + 'fromChainId') as 'fromChainId',
              chainId
            )
            setValue((fieldNamePrefix + 'denom') as 'denom', denomOrAddress)
            setValue((fieldNamePrefix + 'from') as 'from', owner.address)
          }}
          readOnly={!isCreating}
          selectedToken={selectedToken?.token}
          showChainImage
          tokens={
            tokens.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: tokens.data.map(({ owner, balance, token }) => ({
                    ...token,
                    owner,
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
        />

        <div
          className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3"
          ref={childRef}
        >
          <div
            className={clsx(
              'flex flex-row items-center',
              wrapped ? 'pl-1' : '-mr-2'
            )}
          >
            <Icon className="!h-6 !w-6 text-text-secondary" />
          </div>

          <div
            className="flex grow flex-row flex-wrap items-stretch gap-1"
            ref={toContainerRef}
          >
            {isCreating && (
              <IbcDestinationChainPicker
                buttonClassName={toWrapped ? 'grow' : undefined}
                includeSourceChain
                onChainSelected={(chainId) =>
                  setValue(
                    (fieldNamePrefix + 'toChainId') as 'toChainId',
                    chainId
                  )
                }
                selectedChainId={toChainId}
                sourceChainId={spendChainId}
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

      {isIbc && (
        <div className="flex flex-col gap-4 rounded-md border-2 border-dashed border-border-primary p-4">
          <InputLabel
            name={t('title.ibcTransferPath')}
            tooltip={t('info.ibcTransferPathTooltip', {
              context:
                ibcPath.loading || ibcPath.errored || ibcPath.data.length === 2
                  ? undefined
                  : // If more than one hop in the path, this uses packet-forward-middleware.
                    'pfm',
            })}
          />

          {ibcPath.loading ? (
            <Loader className="!justify-start" fill={false} size={26} />
          ) : ibcPath.errored ? (
            <p className="body-text text-text-interactive-error">
              {processError(ibcPath.error, {
                forceCapture: false,
              })}
            </p>
          ) : (
            <div>
              <div className="flex flex-row items-center gap-3">
                {ibcPath.data.map((chainId, index) => (
                  <>
                    <div className="flex flex-row items-center gap-2">
                      <ChainLogo chainId={chainId} />

                      <p className="primary-text">
                        {getDisplayNameForChainId(chainId)}
                      </p>
                    </div>

                    {index !== ibcPath.data.length - 1 && (
                      <ArrowRightAltRounded className="!h-5 !w-5 text-text-secondary" />
                    )}
                  </>
                ))}
              </div>

              {isCreating &&
                !betterNonPfmIbcPath.loading &&
                betterNonPfmIbcPath.data && (
                  <WarningCard
                    className="mt-4 max-w-xl"
                    content={
                      <div className="flex flex-col gap-3">
                        <p className="primary-text text-text-interactive-warning-body">
                          {t('info.betterNonPfmIbcPathAvailable')}
                        </p>

                        <div className="flex flex-row items-center gap-3">
                          {betterNonPfmIbcPath.data.map((chainId, index) => (
                            <>
                              <div className="flex flex-row items-center gap-2">
                                <ChainLogo chainId={chainId} />

                                <p className="primary-text">
                                  {getDisplayNameForChainId(chainId)}
                                </p>
                              </div>

                              {index !==
                                betterNonPfmIbcPath.data!.length - 1 && (
                                <ArrowRightAltRounded className="!h-5 !w-5 text-text-secondary" />
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    }
                  />
                )}

              {isCreating && !!missingAccountChainIds?.length && (
                <WarningCard
                  className="mt-4 max-w-xl"
                  content={
                    <div className="flex flex-col items-start gap-3">
                      <p className="primary-text text-text-interactive-warning-body">
                        {t('info.betterPfmIbcPathAvailable', {
                          chains: missingAccountChainIds
                            .map((chainId) => getDisplayNameForChainId(chainId))
                            .join(', '),
                          count: missingAccountChainIds.length,
                        })}
                      </p>

                      {addAction && (
                        <Button
                          onClick={() => {
                            // Remove the current action.
                            remove()
                            // Add missing chains. Use polytone if possible, or
                            // ICA otherwise.
                            missingAccountChainIds.forEach((chainId) => {
                              const hasPolytoneConnection =
                                !!getSupportedChainConfig(mainChainId)
                                  ?.polytone?.[chainId]

                              if (hasPolytoneConnection) {
                                addAction({
                                  actionKey: ActionKey.CreateCrossChainAccount,
                                  data: {
                                    chainId,
                                  },
                                })
                              } else {
                                addAction({
                                  actionKey: ActionKey.CreateIca,
                                  data: {
                                    chainId,
                                  },
                                })
                                addAction({
                                  actionKey: ActionKey.ManageIcas,
                                  data: {
                                    chainId,
                                    register: true,
                                  },
                                })
                              }
                            })
                          }}
                        >
                          {t('button.createMissingChainActions')}
                        </Button>
                      )}
                    </div>
                  }
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
