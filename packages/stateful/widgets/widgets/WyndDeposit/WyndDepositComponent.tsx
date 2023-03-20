import { coins } from '@cosmjs/amino'
import { ArrowDropDown, ArrowOutwardRounded } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import {
  WyndexMultiHopSelectors,
  genericTokenSelector,
  refreshWalletBalancesIdAtom,
  wyndPoolsSelector,
  wyndSwapOperationsSelector,
} from '@dao-dao/state/recoil'
import {
  Button,
  ButtonLink,
  CopyToClipboard,
  FilterableItemPopup,
  FilterableItemPopupProps,
  MarkdownRenderer,
  TokenAmountDisplay,
  useCachedLoadable,
  useCachedLoading,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  GenericToken,
  TokenType,
  WidgetComponentProps,
  WyndPoolToken,
} from '@dao-dao/types'
import { ExecuteSwapOperationsMsg } from '@dao-dao/types/contracts/WyndexMultiHop'
import {
  CHAIN_TXN_URL_PREFIX,
  DAO_DAO_DAO_ADDRESS,
  NATIVE_TOKEN,
  WYND_MULTI_HOP_CONTRACT,
  convertMicroDenomToDenomWithDecimals,
  genericTokenToAssetInfo,
  processError,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../components'
import { useLoadingWyndReferralCommission } from '../../../hooks'
import { genericTokenBalancesSelector } from '../../../recoil'
import { WyndDepositData } from './types'

export const WyndDepositComponent = ({
  variables: {
    markdown,
    outputAddress,
    outputToken: _outputToken,
    outputAmount,
    buttonLabel,
  },
}: WidgetComponentProps<WyndDepositData>) => {
  const { t } = useTranslation()
  const {
    signingCosmWasmClient,
    address: walletAddress = '',
    connected,
  } = useWallet()
  const { coreAddress, chainId } = useDaoInfoContext()

  // Default to the DAO's treasury if no output specified.
  outputAddress ||= coreAddress

  const setRefreshWalletBalances = useSetRecoilState(
    refreshWalletBalancesIdAtom(walletAddress)
  )
  const setRefreshOutputBalances = useSetRecoilState(
    refreshWalletBalancesIdAtom(outputAddress)
  )
  const refreshBalances = () => {
    setRefreshWalletBalances((id) => id + 1)
    setRefreshOutputBalances((id) => id + 1)
  }

  const walletBalances = useCachedLoading(
    walletAddress
      ? genericTokenBalancesSelector({
          address: walletAddress,
          chainId,
        })
      : undefined,
    []
  )

  const wyndPoolsLoadable = useCachedLoadable(wyndPoolsSelector)
  if (wyndPoolsLoadable.state === 'hasError') {
    throw wyndPoolsLoadable.contents
  }
  const wyndPools =
    wyndPoolsLoadable.state !== 'hasValue'
      ? undefined
      : wyndPoolsLoadable.contents
  const uniqueWyndPoolTokens = Object.values(
    Object.values(wyndPools ?? {})
      .flat()
      .reduce(
        (acc, token) => ({
          ...acc,
          // Ignore amount when comparing tokens.
          [JSON.stringify({ ...token, amount: '0' })]: token,
        }),
        {} as Record<string, WyndPoolToken>
      )
  )
  const loadingWyndTokens = useCachedLoading(
    uniqueWyndPoolTokens.length > 0
      ? waitForAll(
          uniqueWyndPoolTokens.map((token) =>
            genericTokenSelector({
              type: 'native' in token ? TokenType.Native : TokenType.Cw20,
              denomOrAddress: 'native' in token ? token.native : token.token,
            })
          )
        )
      : undefined,
    []
  )

  const availableTokenItems = useMemo(
    () =>
      loadingWyndTokens.loading
        ? []
        : loadingWyndTokens.data.map(({ denomOrAddress, symbol, imageUrl }) => {
            const { token, balance } = (!walletBalances.loading &&
              walletBalances.data.find(
                ({ token }) => token.denomOrAddress === denomOrAddress
              )) || { token: undefined, balance: '0' }

            return {
              key: denomOrAddress,
              label: symbol,
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
          }) ?? [],
    [loadingWyndTokens, walletBalances, t]
  )

  const [token, setToken] = useState<GenericToken>(NATIVE_TOKEN)
  const inTokenIsOutToken =
    token.type === _outputToken.type &&
    token.denomOrAddress === _outputToken.denomOrAddress
  const tokenBalance = walletBalances.loading
    ? 0
    : Number(
        walletBalances.data.find(
          ({ token: { type, denomOrAddress } }) =>
            token.type === type && token.denomOrAddress === denomOrAddress
        )?.balance ?? 0
      )

  // Get swap operations for the selected tokens.
  const outputToken = loadingWyndTokens.loading
    ? undefined
    : loadingWyndTokens.data.find(
        ({ type, denomOrAddress }) =>
          _outputToken.type === type &&
          _outputToken.denomOrAddress === denomOrAddress
      )
  const swapOperationsLoadable = useRecoilValueLoadable(
    outputToken && !inTokenIsOutToken
      ? wyndSwapOperationsSelector({
          offerAsset: genericTokenToAssetInfo(token),
          askAsset: genericTokenToAssetInfo(outputToken),
        })
      : constSelector(undefined)
  )
  const loadingMaxReferralCommission = useLoadingWyndReferralCommission()
  const swapSimulation = useRecoilValueLoadable(
    swapOperationsLoadable.state === 'hasValue' &&
      swapOperationsLoadable.contents &&
      outputToken &&
      !loadingMaxReferralCommission.loading
      ? WyndexMultiHopSelectors.simulateReverseSwapOperationsSelector({
          contractAddress: WYND_MULTI_HOP_CONTRACT,
          params: [
            {
              askAmount: outputAmount,
              operations: swapOperationsLoadable.contents,
              referral: true,
              referralCommission: loadingMaxReferralCommission.data,
            },
          ],
        })
      : constSelector(undefined)
  )
  const swapSimulationInput =
    swapSimulation.state === 'hasValue' && swapSimulation.contents
      ? // Add 1% so the minimum output received can be equal to output amount.
        Math.round(Number(swapSimulation.contents.amount) * 1.01)
      : 0

  const requiredInput = inTokenIsOutToken
    ? Number(outputAmount)
    : swapSimulationInput

  const TokenTrigger: FilterableItemPopupProps['Trigger'] = useCallback(
    ({ open, ...props }) => (
      <Button
        className={clsx(
          (loadingWyndTokens.loading || walletBalances.loading) &&
            'animate-pulse'
        )}
        disabled={
          loadingWyndTokens.loading || walletBalances.loading || !connected
        }
        pressed={open}
        variant="ghost"
        {...props}
      >
        <div
          className="mr-1 h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${token.imageUrl})` }}
        />
        <div className="flex max-w-[10rem] flex-col items-start gap-1 overflow-hidden text-left">
          <p className="title-text max-w-full truncate">{token.symbol}</p>
          <p className="caption-text">
            {t('title.balance')}:{' '}
            <span className={clsx(walletBalances.loading && 'animate-pulse')}>
              {walletBalances.loading
                ? '...'
                : convertMicroDenomToDenomWithDecimals(
                    tokenBalance,
                    token.decimals
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: token.decimals,
                  })}
            </span>
          </p>
        </div>
        <ArrowDropDown className="ml-2 !h-6 !w-6" />
      </Button>
    ),
    [
      connected,
      loadingWyndTokens.loading,
      t,
      token.decimals,
      token.imageUrl,
      token.symbol,
      tokenBalance,
      walletBalances.loading,
    ]
  )

  const [depositing, setDepositing] = useState(false)
  const [error, setError] = useState('')
  const [txHash, setTxHash] = useState('')

  const necessaryDataLoaded =
    !loadingMaxReferralCommission.loading &&
    // Don't need any simulation data if the input token is the output token.
    (inTokenIsOutToken ||
      (swapSimulation.state === 'hasValue' &&
        !!swapSimulation.contents &&
        swapOperationsLoadable.state === 'hasValue' &&
        !!swapOperationsLoadable.contents &&
        swapSimulationInput > 0))

  const deposit = async () => {
    if (!signingCosmWasmClient || !walletAddress) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    if (!necessaryDataLoaded) {
      return
    }

    setDepositing(true)
    setError('')
    setTxHash('')

    try {
      let tx

      if (inTokenIsOutToken) {
        if (token.type === TokenType.Native) {
          tx = await signingCosmWasmClient.sendTokens(
            walletAddress,
            outputAddress,
            coins(outputAmount, token.denomOrAddress),
            'auto'
          )
        } else {
          // Cw20
          tx = await signingCosmWasmClient.execute(
            walletAddress,
            token.denomOrAddress,
            {
              transfer: {
                recipient: outputAddress,
                amount: outputAmount,
              },
            },
            'auto'
          )
        }
      } else {
        // Swap
        const msg: ExecuteSwapOperationsMsg = {
          execute_swap_operations: {
            operations: swapOperationsLoadable.contents!,
            minimum_receive: outputAmount,
            // 1% slippage
            max_spread: '0.01',
            referral_address: DAO_DAO_DAO_ADDRESS,
            referral_commission: loadingMaxReferralCommission.data,
            receiver: outputAddress,
          },
        }

        if (token.type === TokenType.Native) {
          tx = await signingCosmWasmClient.execute(
            walletAddress,
            WYND_MULTI_HOP_CONTRACT,
            msg,
            'auto',
            undefined,
            coins(requiredInput, token.denomOrAddress)
          )
        } else {
          // Cw20
          tx = await signingCosmWasmClient.execute(
            walletAddress,
            token.denomOrAddress,
            {
              send: {
                contract: WYND_MULTI_HOP_CONTRACT,
                amount: requiredInput.toString(),
                msg: JSON.stringify(msg),
              },
            },
            'auto'
          )
        }
      }

      toast.success(t('success.transactionExecuted'))
      setTxHash(tx.transactionHash)

      refreshBalances()
    } catch (err) {
      console.error(err)

      const error = processError(err)
      setError(error)
    } finally {
      setDepositing(false)
    }
  }

  const insufficientFunds = requiredInput > 0 && tokenBalance < requiredInput

  // If input and output tokens are the same, then we don't need to load
  // simulation amounts since the output is the same as the input.
  const depositAmountLoading =
    !inTokenIsOutToken &&
    (swapOperationsLoadable.state === 'loading' ||
      swapSimulation.state === 'loading' ||
      swapSimulationInput === 0)

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 rounded-md bg-background-tertiary p-6">
      {markdown && (
        <MarkdownRenderer className="text-base" markdown={markdown} />
      )}

      <p className="caption-text -mb-6">{t('info.chooseTokenToPayWith')}:</p>
      <div className="flex flex-row items-center justify-between gap-2">
        <FilterableItemPopup
          Trigger={TokenTrigger}
          filterableItemKeys={FILTERABLE_KEYS}
          items={availableTokenItems}
          onSelect={(_, index) => {
            if (loadingWyndTokens.loading) {
              return
            }

            setToken(loadingWyndTokens.data[index])
          }}
          searchPlaceholder={t('info.searchForToken')}
        />

        <Button
          disabled={!necessaryDataLoaded || insufficientFunds}
          loading={
            // Make sure this shows loading when the token is changed since it
            // recalculates the deposit amount.
            depositAmountLoading || depositing
          }
          onClick={deposit}
          size="lg"
        >
          {buttonLabel || t('button.deposit')}
        </Button>
      </div>

      {insufficientFunds && !walletBalances.loading ? (
        <p className="-mt-4 self-end text-right text-text-interactive-error">
          {t('error.insufficientForDeposit', {
            amount: depositAmountLoading
              ? '...'
              : convertMicroDenomToDenomWithDecimals(
                  requiredInput,
                  token.decimals
                ).toLocaleString(undefined, {
                  maximumFractionDigits: token.decimals,
                }),
            tokenSymbol: token.symbol,
          })}
        </p>
      ) : (
        !insufficientFunds && (
          <div className="-mt-4 justify-end gap-2 self-end">
            <div className="flex flex-row items-center gap-3">
              <p className="caption-text">{t('title.deposits')}</p>

              <TokenAmountDisplay
                amount={
                  depositAmountLoading
                    ? { loading: true }
                    : {
                        loading: false,
                        data: convertMicroDenomToDenomWithDecimals(
                          requiredInput,
                          token.decimals
                        ),
                      }
                }
                decimals={token.decimals}
                showFullAmount
                symbol={token.symbol}
              />
            </div>

            {coreAddress !== outputAddress && (
              <div className="flex flex-row items-center gap-3">
                <p className="caption-text">{t('info.to')}</p>

                <EntityDisplay address={outputAddress} />
              </div>
            )}
          </div>
        )
      )}

      {error && (
        <p className="secondary-text max-w-prose self-end text-right text-sm text-text-interactive-error">
          {error}
        </p>
      )}

      {txHash && (
        <div className="flex flex-col gap-2">
          <p className="title-text">{t('title.transaction')}:</p>

          <div className="flex flex-row flex-wrap justify-between gap-x-4 gap-y-2 rounded-md bg-background-secondary px-4 py-2">
            <CopyToClipboard
              className="text-text-interactive-valid"
              value={txHash}
            />

            <ButtonLink href={CHAIN_TXN_URL_PREFIX + txHash} variant="ghost">
              {t('button.openInChainExplorer')}{' '}
              <ArrowOutwardRounded className="!h-4 !w-4" />
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  )
}

const FILTERABLE_KEYS = ['key', 'label']
