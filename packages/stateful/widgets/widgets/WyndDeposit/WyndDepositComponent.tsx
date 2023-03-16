import { coins } from '@cosmjs/amino'
import { ArrowDropDown } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'

import {
  WyndexMultiHopSelectors,
  genericTokenSelector,
  wyndPoolsSelector,
  wyndSwapOperationsSelector,
} from '@dao-dao/state/recoil'
import {
  Button,
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
  DAO_DAO_DAO_ADDRESS,
  NATIVE_TOKEN,
  WYND_MULTI_HOP_CONTRACT,
  convertMicroDenomToDenomWithDecimals,
  genericTokenToAssetInfo,
  processError,
} from '@dao-dao/utils'

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
      ? Number(swapSimulation.contents.amount)
      : 0

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
    try {
      const msg: ExecuteSwapOperationsMsg['execute_swap_operations'] = {
        operations: swapOperationsLoadable.contents!,
        minimum_receive: outputAmount,
        // 1% slippage
        max_spread: '0.01',
        referral_address: DAO_DAO_DAO_ADDRESS,
        referral_commission: loadingMaxReferralCommission.data,
        // Default to the DAO's treasury if no output specified.
        receiver: outputAddress || coreAddress,
      }

      if (token.type === TokenType.Native) {
        await signingCosmWasmClient.execute(
          walletAddress,
          WYND_MULTI_HOP_CONTRACT,
          msg,
          'auto',
          undefined,
          coins(swapSimulationInput, token.denomOrAddress)
        )
      } else {
        // Cw20
        await signingCosmWasmClient.execute(
          walletAddress,
          token.denomOrAddress,
          {
            amount: swapSimulationInput.toString(),
            contract: WYND_MULTI_HOP_CONTRACT,
            msg: JSON.stringify(msg),
          },
          'auto'
        )
      }
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    } finally {
      setDepositing(false)
    }
  }

  const requiredInput = inTokenIsOutToken
    ? Number(outputAmount)
    : swapSimulationInput
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

      {insufficientFunds ? (
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
        <div className="-mt-4 flex flex-row items-center justify-end gap-2 self-end">
          <p className="caption-text">{t('title.deposit')}:</p>

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
      )}
    </div>
  )
}

const FILTERABLE_KEYS = ['key', 'label']
