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
  useCachedLoading,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  processError,
} from '@dao-dao/utils'

import { Cw20BaseHooks, useWalletInfo } from '../../hooks'
import { ConnectWallet } from '../ConnectWallet'

export type DaoTokenDepositModalProps = Pick<
  TokenDepositModalProps,
  'token' | 'onClose' | 'visible'
>

export const DaoTokenDepositModal = ({
  token,
  onClose,
  ...props
}: DaoTokenDepositModalProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { connected, address, signingCosmWasmClient } = useWallet()
  const { refreshBalances: refreshWalletBalances } = useWalletInfo()

  const setRefreshDaoBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(coreAddress)
  )
  const refreshDaoBalances = useCallback(
    () => setRefreshDaoBalancesId((id) => id + 1),
    [setRefreshDaoBalancesId]
  )

  const loadingBalance = useCachedLoading(
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
        }),
    {
      amount: 0,
      timestamp: new Date(),
    }
  )

  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const transferCw20 = Cw20BaseHooks.useTransfer({
    contractAddress: token.type === 'cw20' ? token.denomOrAddress : '',
    sender: address ?? '',
  })

  const onDeposit = useCallback(
    async (amount: number) => {
      if (!signingCosmWasmClient || !address) {
        toast.error(t('error.logInToContinue'))
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
      ConnectWallet={ConnectWallet}
      amount={amount}
      connected={connected}
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
      warning={t('info.depositTokenWarning')}
      {...props}
    />
  )
}
