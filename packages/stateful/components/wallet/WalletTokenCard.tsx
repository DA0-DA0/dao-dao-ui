import {
  ArchiveRounded,
  Paid,
  PaidRounded,
  PaymentRounded,
  SavingsRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  refreshHiddenBalancesAtom,
  refreshNativeTokenStakingInfoAtom,
} from '@dao-dao/state'
import {
  ChainProvider,
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
  useCachedLoading,
} from '@dao-dao/stateless'
import { ActionKey, TokenCardInfo, TokenType } from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  HIDDEN_BALANCE_PREFIX,
  KVPK_API_BASE,
  cwMsgToEncodeObject,
  getMeTxPrefillPath,
  getNativeTokenForChainId,
  getSupportedChainConfig,
  isNativeIbcUsdc,
  processError,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useCfWorkerAuthPostRequest,
  useWallet,
  useWalletBalances,
} from '../../hooks'
import {
  hiddenBalancesSelector,
  temporaryHiddenBalancesAtom,
  tokenCardLazyInfoSelector,
} from '../../recoil'
import { ButtonLink } from '../ButtonLink'
import { EntityDisplay } from '../EntityDisplay'
import { WalletFiatRampModal } from './WalletFiatRampModal'
import { WalletStakingModal } from './WalletStakingModal'

export const WalletTokenCard = (props: TokenCardInfo) => {
  const { t } = useTranslation()
  const nativeToken = getNativeTokenForChainId(props.token.chainId)
  const {
    address: walletAddress = '',
    hexPublicKey,
    getSigningCosmWasmClient,
  } = useWallet({
    chainId: props.token.chainId,
    loadAccount: true,
  })
  const { refreshBalances } = useWalletBalances({
    chainId: props.token.chainId,
  })

  const lazyInfo = useCachedLoading(
    tokenCardLazyInfoSelector({
      owner: props.owner.address,
      token: props.token,
      unstakedBalance: props.unstakedBalance,
    }),
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
    temporaryHiddenBalancesAtom(hexPublicKey.loading ? '' : hexPublicKey.data)
  )
  const hiddenBalancesLoadable = useCachedLoadable(
    !hexPublicKey.loading
      ? hiddenBalancesSelector(hexPublicKey.data)
      : undefined
  )
  const isHidden =
    hiddenBalancesLoadable.state === 'hasValue'
      ? hiddenBalancesLoadable.contents.includes(props.token.denomOrAddress)
      : undefined

  const [savingHidden, setSavingHidden] = useState(false)

  const setBalanceHidden = async (hidden: boolean) => {
    if (!hiddenBalancesReady) {
      toast.error(t('error.logInToContinue'))
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
    props.token.denomOrAddress === nativeToken.denomOrAddress
  const isUsdc =
    props.token.type === TokenType.Native &&
    isNativeIbcUsdc(props.token.chainId, props.token.denomOrAddress)

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
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setClaimLoading(true)
    try {
      const signingCosmWasmClient = await getSigningCosmWasmClient()
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
        CHAIN_GAS_MULTIPLIER
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

  const kadoModalEnabled = !!getSupportedChainConfig(props.token.chainId)?.kado

  return (
    <ChainProvider chainId={props.token.chainId}>
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
              href: getMeTxPrefillPath([
                {
                  actionKey: ActionKey.Spend,
                  data: {
                    fromChainId: props.token.chainId,
                    toChainId: props.token.chainId,
                    from: props.owner.address,
                    to: '',
                    amount: 0,
                    denom: props.token.denomOrAddress,
                  },
                },
              ]),
            },
            ...(isUsdc && kadoModalEnabled
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
          props.token.denomOrAddress === nativeToken.denomOrAddress
            ? refreshNativeTokenStakingInfo
            : undefined
        }
      />

      {isUsdc && kadoModalEnabled && (
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
    </ChainProvider>
  )
}
