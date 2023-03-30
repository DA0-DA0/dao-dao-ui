import {
  ArchiveRounded,
  Paid,
  PaidRounded,
  PaymentRounded,
  SavingsRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  refreshHiddenBalancesAtom,
  refreshNativeTokenStakingInfoAtom,
} from '@dao-dao/state'
import {
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
  useCachedLoading,
} from '@dao-dao/stateless'
import { CoreActionKey, TokenCardInfo, TokenType } from '@dao-dao/types'
import {
  HIDDEN_BALANCE_PREFIX,
  KVPK_API_BASE,
  MAINNET,
  NATIVE_TOKEN,
  cwMsgToEncodeObject,
  getMeTxPrefillPath,
  isJunoIbcUsdc,
  processError,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useCfWorkerAuthPostRequest,
  useWalletInfo,
} from '../hooks'
import {
  hiddenBalancesSelector,
  temporaryHiddenBalancesAtom,
  tokenCardLazyInfoSelector,
} from '../recoil'
import { ButtonLink } from './ButtonLink'
import { EntityDisplay } from './EntityDisplay'
import { WalletFiatRampModal } from './WalletFiatRampModal'
import { WalletStakingModal } from './WalletStakingModal'

export const WalletTokenCard = (props: TokenCardInfo) => {
  const { t } = useTranslation()
  const {
    address: walletAddress = '',
    publicKey,
    signingCosmWasmClient,
    chainInfo,
  } = useWallet()

  const { refreshBalances } = useWalletInfo()

  const lazyInfo = useCachedLoading(
    walletAddress
      ? tokenCardLazyInfoSelector({
          walletAddress,
          chainId: chainInfo?.chainId,
          token: props.token,
          unstakedBalance: props.unstakedBalance,
        })
      : undefined,
    {
      usdUnitPrice: undefined,
      stakingInfo: undefined,
      totalBalance: props.unstakedBalance,
    }
  )

  // Refresh staking info.
  const setRefreshNativeTokenStakingInfo = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(walletAddress)
  )
  const refreshNativeTokenStakingInfo = useCallback(
    () => setRefreshNativeTokenStakingInfo((id) => id + 1),
    [setRefreshNativeTokenStakingInfo]
  )

  const { ready: hiddenBalancesReady, postRequest: postHiddenBalancesRequest } =
    useCfWorkerAuthPostRequest(KVPK_API_BASE, 'Hidden Balances')

  const setRefreshHidden = useSetRecoilState(refreshHiddenBalancesAtom)
  const refreshHidden = useCallback(
    () => setRefreshHidden((id) => id + 1),
    [setRefreshHidden]
  )

  const setTemporaryHiddenBalances = useSetRecoilState(
    temporaryHiddenBalancesAtom(publicKey?.hex ?? '')
  )
  const hiddenBalancesLoadable = useCachedLoadable(
    publicKey?.hex ? hiddenBalancesSelector(publicKey.hex) : undefined
  )
  const isHidden =
    hiddenBalancesLoadable.state === 'hasValue'
      ? hiddenBalancesLoadable.contents.includes(props.token.denomOrAddress)
      : undefined

  const [savingHidden, setSavingHidden] = useState(false)

  const setBalanceHidden = async (hidden: boolean) => {
    if (!hiddenBalancesReady) {
      toast.error(t('error.connectWalletToContinue'))
    }

    setSavingHidden(true)
    try {
      const key = HIDDEN_BALANCE_PREFIX + props.token.denomOrAddress
      // Delete the key if hidden is false.
      const value = hidden ? 1 : null

      await postHiddenBalancesRequest('/set', {
        key,
        value,
      })

      setTemporaryHiddenBalances((prev) => ({
        ...prev,
        [key]: value,
      }))
      refreshHidden()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setSavingHidden(false)
    }
  }

  const isNative =
    props.token.type === TokenType.Native &&
    props.token.denomOrAddress === NATIVE_TOKEN.denomOrAddress
  const isUsdc =
    props.token.type === TokenType.Native &&
    isJunoIbcUsdc(props.token.denomOrAddress)

  // Set this to a value to show the fiat ramp modal defaulted to that option.
  const [fiatRampDefaultModeVisible, setFiatRampDefaultModeVisible] = useState<
    'buy' | 'sell' | undefined
  >()

  const [stakingModalVisible, setStakingModalVisible] = useState(false)

  const awaitNextBlock = useAwaitNextBlock()

  const claimReady =
    !lazyInfo.loading && !!lazyInfo.data.stakingInfo?.stakes.length
  const [claimLoading, setClaimLoading] = useState(false)
  const onClaim = async () => {
    if (!claimReady) {
      return
    }
    if (!signingCosmWasmClient || !walletAddress) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setClaimLoading(true)
    try {
      await signingCosmWasmClient.signAndBroadcast(
        walletAddress,
        (lazyInfo.loading ? [] : lazyInfo.data.stakingInfo!.stakes).map(
          ({ validator }) =>
            cwMsgToEncodeObject(
              {
                distribution: {
                  withdraw_delegator_reward: {
                    validator: validator.address,
                  },
                },
              },
              walletAddress
            )
        ),
        'auto'
      )

      // Wait for balances to update.
      await awaitNextBlock()
      refreshBalances()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setClaimLoading(false)
    }
  }

  return (
    <>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        EntityDisplay={EntityDisplay}
        actions={{
          token: [
            {
              Icon: PaymentRounded,
              label: t('button.spend'),
              closeOnClick: true,
              href: getMeTxPrefillPath({
                actions: [
                  {
                    actionKey: CoreActionKey.Spend,
                    data: {
                      to: '',
                      amount: 0,
                      denom: props.token.denomOrAddress,
                    },
                  },
                ],
              }),
            },
            ...(isUsdc && MAINNET
              ? [
                  {
                    Icon: Paid,
                    label: t('button.depositFiat'),
                    closeOnClick: true,
                    onClick: () => setFiatRampDefaultModeVisible('buy'),
                  },
                  {
                    Icon: SavingsRounded,
                    label: t('button.withdrawFiat'),
                    closeOnClick: true,
                    onClick: () => setFiatRampDefaultModeVisible('sell'),
                  },
                ]
              : []),
            ...(isNative
              ? [
                  {
                    Icon: ArchiveRounded,
                    label: t('button.stakeOrUnstake'),
                    closeOnClick: true,
                    onClick: () => setStakingModalVisible(true),
                  },
                  ...(claimReady
                    ? [
                        {
                          Icon: PaidRounded,
                          label: t('button.claimStakingRewards'),
                          closeOnClick: false,
                          onClick: onClaim,
                          loading: claimLoading,
                        },
                      ]
                    : []),
                ]
              : []),
          ],
          extraSections:
            isHidden === undefined
              ? undefined
              : [
                  {
                    label: t('title.visibility'),
                    buttons: [
                      {
                        Icon: isHidden ? Visibility : VisibilityOff,
                        label: isHidden ? t('button.unhide') : t('button.hide'),
                        closeOnClick: false,
                        onClick: () => setBalanceHidden(!isHidden),
                        loading: savingHidden,
                      },
                    ],
                  },
                ],
        }}
        lazyInfo={lazyInfo}
        refreshUnstakingTasks={
          props.token.type === TokenType.Native &&
          props.token.denomOrAddress === NATIVE_TOKEN.denomOrAddress
            ? refreshNativeTokenStakingInfo
            : undefined
        }
      />

      {isUsdc && (
        <WalletFiatRampModal
          defaultMode={fiatRampDefaultModeVisible}
          onClose={() => setFiatRampDefaultModeVisible(undefined)}
          visible={fiatRampDefaultModeVisible !== undefined}
        />
      )}

      {isNative && (
        <WalletStakingModal
          onClose={() => setStakingModalVisible(false)}
          visible={stakingModalVisible}
        />
      )}
    </>
  )
}
