import { coins } from '@cosmjs/stargate'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { Cw20BaseHooks, useWalletProfile } from '@dao-dao/state/hooks'
import {
  Cw20BaseSelectors,
  nativeDenomBalanceWithTimestampSelector,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  TokenDepositModal,
  TokenDepositModalProps,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

export type DaoTokenDepositModalProps = Omit<
  TokenDepositModalProps,
  'loadingBalance' | 'onDeposit' | 'loading' | 'amount' | 'setAmount'
> & {
  tokenType: 'native' | 'cw20'
  tokenDenomOrAddress: string
}

export const DaoTokenDepositModal = ({
  tokenType,
  tokenDenomOrAddress,
  onClose,
  tokenDecimals,
  tokenSymbol,
  ...props
}: DaoTokenDepositModalProps) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress, chainId } = useDaoInfoContext()
  const { address, signingCosmWasmClient } = useWallet()
  const { refreshBalances: refreshWalletBalances } = useWalletProfile()

  const setRefreshDaoBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(coreAddress)
  )
  const refreshDaoBalances = useCallback(
    () => setRefreshDaoBalancesId((id) => id + 1),
    [setRefreshDaoBalancesId]
  )

  const loadingBalance = loadableToLoadingData(
    useCachedLoadable(
      !address
        ? undefined
        : tokenType === 'native'
        ? nativeDenomBalanceWithTimestampSelector({
            walletAddress: address,
            chainId,
            denom: tokenDenomOrAddress,
          })
        : Cw20BaseSelectors.balanceWithTimestampSelector({
            contractAddress: tokenDenomOrAddress,
            chainId,
            params: [{ address }],
          })
    ),
    {
      amount: 0,
      timestamp: new Date(),
    }
  )

  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false)

  const transferCw20 = Cw20BaseHooks.useTransfer({
    contractAddress: tokenType === 'cw20' ? tokenDenomOrAddress : '',
    sender: address ?? '',
  })

  const onDeposit = useCallback(
    async (amount: number) => {
      if (!signingCosmWasmClient || !address) {
        toast.error(t('error.connectWalletToContinue'))
        return
      }

      setLoading(true)
      try {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          tokenDecimals
        ).toString()

        if (tokenType === 'native') {
          await signingCosmWasmClient.sendTokens(
            address,
            coreAddress,
            coins(microAmount, tokenDenomOrAddress),
            'auto'
          )
        } else if (tokenType === 'cw20') {
          await transferCw20({
            amount: microAmount,
            recipient: coreAddress,
          })
        }

        refreshWalletBalances()
        refreshDaoBalances()

        toast.success(
          t('success.depositedTokenIntoDao', {
            amount: amount.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            }),
            tokenSymbol,
            daoName,
          })
        )

        onClose?.()
        // Clear amount after a timeout to allow closing.
        setTimeout(() => setAmount(0), 500)
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setLoading(false)
      }
    },
    [
      address,
      coreAddress,
      daoName,
      onClose,
      refreshDaoBalances,
      refreshWalletBalances,
      setAmount,
      signingCosmWasmClient,
      t,
      tokenDecimals,
      tokenDenomOrAddress,
      tokenSymbol,
      tokenType,
      transferCw20,
    ]
  )

  return (
    <TokenDepositModal
      amount={amount}
      loading={loading}
      loadingBalance={
        loadingBalance.loading
          ? loadingBalance
          : {
              loading: false,
              data: {
                amount: convertMicroDenomToDenomWithDecimals(
                  loadingBalance.data.amount,
                  tokenDecimals
                ),
                timestamp: loadingBalance.data.timestamp,
              },
            }
      }
      onClose={onClose}
      onDeposit={onDeposit}
      setAmount={setAmount}
      tokenDecimals={tokenDecimals}
      tokenSymbol={tokenSymbol}
      {...props}
    />
  )
}
