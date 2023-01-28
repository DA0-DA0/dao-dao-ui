import { coins } from '@cosmjs/stargate'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

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

import { Cw20BaseHooks, useWalletInfo } from '../../hooks'

export type DaoTokenDepositModalProps = Omit<
  TokenDepositModalProps,
  'loadingBalance' | 'onDeposit' | 'loading' | 'amount' | 'setAmount'
>

export const DaoTokenDepositModal = ({
  token,
  onClose,
  ...props
}: DaoTokenDepositModalProps) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress, chainId } = useDaoInfoContext()
  const { address, signingCosmWasmClient } = useWallet()
  const { refreshBalances: refreshWalletBalances } = useWalletInfo()

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
        : token.type === 'native'
        ? nativeDenomBalanceWithTimestampSelector({
            walletAddress: address,
            chainId,
            denom: token.denomOrAddress,
          })
        : Cw20BaseSelectors.balanceWithTimestampSelector({
            contractAddress: token.denomOrAddress,
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
    contractAddress: token.type === 'cw20' ? token.denomOrAddress : '',
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
          token.decimals
        ).toString()

        if (token.type === 'native') {
          await signingCosmWasmClient.sendTokens(
            address,
            coreAddress,
            coins(microAmount, token.denomOrAddress),
            'auto'
          )
        } else if (token.type === 'cw20') {
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
              maximumFractionDigits: token.decimals,
            }),
            tokenSymbol: token.symbol,
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
      token,
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
                  token.decimals
                ),
                timestamp: loadingBalance.data.timestamp,
              },
            }
      }
      onClose={onClose}
      onDeposit={onDeposit}
      setAmount={setAmount}
      token={token}
      {...props}
    />
  )
}
