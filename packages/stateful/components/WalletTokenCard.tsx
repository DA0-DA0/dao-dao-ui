import {
  Paid,
  SavingsRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  Cw20StakeSelectors,
  refreshHiddenBalancesAtom,
  refreshNativeTokenStakingInfoAtom,
} from '@dao-dao/state'
import {
  DepositEmoji,
  MoneyEmoji,
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenType } from '@dao-dao/types'
import {
  HIDDEN_BALANCE_PREFIX,
  JUNO_USDC_DENOM,
  KVPK_API_BASE,
  NATIVE_DENOM,
  cwMsgToEncodeObject,
  processError,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useCfWorkerAuthPostRequest,
  useWalletInfo,
} from '../hooks'
import { hiddenBalancesSelector, temporaryHiddenBalancesAtom } from '../recoil'
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
  } = useWallet()

  // Get DAOs that use dao-voting-cw20-staked with this governance token.
  const daosLoadable = useCachedLoadable(
    props.token.type === TokenType.Cw20
      ? Cw20BaseSelectors.daosWithVotingAndStakingContractSelector({
          contractAddress: props.token.denomOrAddress,
        })
      : undefined
  )
  // Get balance wallet has staked in each DAO.
  const daosWalletStakedTokensLoadable = useCachedLoadable(
    daosLoadable.state === 'hasValue' && walletAddress
      ? waitForAll(
          daosLoadable.contents.map(({ stakingContractAddress }) =>
            Cw20StakeSelectors.stakedValueSelector({
              contractAddress: stakingContractAddress,
              params: [
                {
                  address: walletAddress,
                },
              ],
            })
          )
        )
      : undefined
  )

  const daosWithBalances =
    daosLoadable.state === 'hasValue' &&
    daosWalletStakedTokensLoadable.state === 'hasValue'
      ? daosLoadable.contents.map(({ coreAddress }, index) => ({
          coreAddress,
          stakedBalance: Number(
            daosWalletStakedTokensLoadable.contents[index].value
          ),
        }))
      : []

  const daosGoverned =
    // If only has a staked balance in one DAO, show just that one.
    daosWithBalances.filter(({ stakedBalance }) => stakedBalance > 0).length ===
    1
      ? daosWithBalances.filter(({ stakedBalance }) => stakedBalance > 0)
      : // Otherwise, sort by staked tokens.
        [...daosWithBalances].sort((a, b) => b.stakedBalance - a.stakedBalance)

  const { refreshBalances } = useWalletInfo()

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
    props.token.denomOrAddress === NATIVE_DENOM
  const isUsdc =
    props.token.type === TokenType.Native &&
    props.token.denomOrAddress === JUNO_USDC_DENOM

  // Set this to a value to show the fiat ramp modal defaulted to that option.
  const [fiatRampDefaultModeVisible, setFiatRampDefaultModeVisible] = useState<
    'buy' | 'sell' | undefined
  >()

  const [stakingModalVisible, setStakingModalVisible] = useState(false)

  const awaitNextBlock = useAwaitNextBlock()

  const claimReady =
    !props.lazyInfo.loading && !!props.lazyInfo.data.stakingInfo?.stakes.length
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
        (props.lazyInfo.loading
          ? []
          : props.lazyInfo.data.stakingInfo!.stakes
        ).map(({ validator }) =>
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
            ...(isUsdc
              ? [
                  {
                    Icon: Paid,
                    label: t('button.depositFiat'),
                    onClick: () => setFiatRampDefaultModeVisible('buy'),
                  },
                  {
                    Icon: SavingsRounded,
                    label: t('button.withdrawFiat'),
                    onClick: () => setFiatRampDefaultModeVisible('sell'),
                  },
                ]
              : []),
            ...(isNative
              ? [
                  {
                    Icon: DepositEmoji,
                    label: t('button.stakeOrUnstake'),
                    onClick: () => setStakingModalVisible(true),
                  },
                  ...(claimReady
                    ? [
                        {
                          Icon: MoneyEmoji,
                          label: t('button.claimStakingRewards'),
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
                        onClick: () => setBalanceHidden(!isHidden),
                        loading: savingHidden,
                      },
                    ],
                  },
                ],
        }}
        daosGoverned={daosGoverned}
        refreshUnstakingTasks={refreshNativeTokenStakingInfo}
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
