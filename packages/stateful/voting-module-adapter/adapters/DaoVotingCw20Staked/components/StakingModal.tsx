import { BigNumber } from 'bignumber.js'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import {
  Cw20StakeSelectors,
  refreshDaoVotingPowerAtom,
  refreshFollowingDaosAtom,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  ModalLoader,
  StakingMode,
  StakingModal as StatelessStakingModal,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { BaseStakingModalProps } from '@dao-dao/types'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  encodeJsonToBase64,
  processError,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  Cw20BaseHooks,
  Cw20StakeHooks,
  OraichainCw20StakingHooks,
  useAwaitNextBlock,
  useWallet,
} from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'

export const StakingModal = (props: BaseStakingModalProps) => (
  <SuspenseLoader
    fallback={<ModalLoader onClose={props.onClose} visible={props.visible} />}
  >
    <InnerStakingModal {...props} />
  </SuspenseLoader>
)

const InnerStakingModal = ({
  onClose,
  visible,
  initialMode = StakingMode.Stake,
  maxDeposit,
}: BaseStakingModalProps) => {
  const { t } = useTranslation()
  const {
    address: walletAddress,
    isWalletConnected,
    refreshBalances,
  } = useWallet()
  const { chainId, coreAddress } = useVotingModuleAdapterOptions()

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)

  const { governanceToken, loadingWalletBalance: loadingUnstakedBalance } =
    useGovernanceTokenInfo({
      fetchWalletBalance: true,
    })
  const {
    stakingContractAddress,
    unstakingDuration,
    refreshTotals,
    sumClaimsAvailable,
    loadingWalletStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
  })

  const [isOraichainCustomStaking, totalStakedBalance, totalValue] =
    useRecoilValue(
      waitForAll([
        Cw20StakeSelectors.isOraichainProxySnapshotContractSelector({
          chainId,
          contractAddress: stakingContractAddress,
        }),
        Cw20StakeSelectors.totalStakedAtHeightSelector({
          chainId,
          contractAddress: stakingContractAddress,
          params: [{}],
        }),
        Cw20StakeSelectors.totalValueSelector({
          chainId,
          contractAddress: stakingContractAddress,
          params: [],
        }),
      ])
    )

  const oraichainCw20StakingConfig = useRecoilValue(
    isOraichainCustomStaking
      ? Cw20StakeSelectors.oraichainProxySnapshotConfigSelector({
          chainId,
          contractAddress: stakingContractAddress,
        })
      : constSelector(undefined)
  )

  // Support Oraichain custom cw20-staking contract.
  const stakingContractToExecute = isOraichainCustomStaking
    ? // If Oraichain proxy snapshot, fallback to empty string so it errors if
      // trying to stake anything. This should never happen.
      oraichainCw20StakingConfig?.staking_contract || ''
    : stakingContractAddress

  const walletStakedBalanceLoadable = useCachedLoadable(
    walletAddress
      ? Cw20StakeSelectors.stakedBalanceAtHeightSelector({
          chainId,
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )
  const walletStakedBalance =
    walletStakedBalanceLoadable.state === 'hasValue' &&
    walletStakedBalanceLoadable.contents
      ? Number(walletStakedBalanceLoadable.contents.balance)
      : undefined

  const [amount, setAmount] = useState(0)

  const doCw20SendAndExecute = Cw20BaseHooks.useSend({
    contractAddress: governanceToken.denomOrAddress,
    sender: walletAddress ?? '',
  })
  const doUnstake = Cw20StakeHooks.useUnstake({
    contractAddress: stakingContractToExecute,
    sender: walletAddress ?? '',
  })
  const doOraichainUnbond = OraichainCw20StakingHooks.useUnbond({
    contractAddress: stakingContractToExecute,
    sender: walletAddress ?? '',
  })
  const doClaim = Cw20StakeHooks.useClaim({
    contractAddress: stakingContractToExecute,
    sender: walletAddress ?? '',
  })

  const setRefreshDaoVotingPower = useSetRecoilState(
    refreshDaoVotingPowerAtom(coreAddress)
  )
  const setRefreshFollowedDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshDaoVotingPower = () => {
    setRefreshDaoVotingPower((id) => id + 1)
    setRefreshFollowedDaos((id) => id + 1)
  }

  const awaitNextBlock = useAwaitNextBlock()
  const onAction = async (mode: StakingMode, amount: number) => {
    if (!isWalletConnected) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setStakingLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        setStakingLoading(true)

        try {
          await doCw20SendAndExecute({
            amount: convertDenomToMicroDenomStringWithDecimals(
              amount,
              governanceToken.decimals
            ),
            contract: stakingContractToExecute,
            msg: encodeJsonToBase64({
              [isOraichainCustomStaking ? 'bond' : 'stake']: {},
            }),
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshDaoVotingPower()

          setAmount(0)
          toast.success(
            `Staked ${amount.toLocaleString(undefined, {
              maximumFractionDigits: governanceToken.decimals,
            })} $${governanceToken.symbol}`
          )

          // Close once done.
          onClose()
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        } finally {
          setStakingLoading(false)
        }

        break
      }
      case StakingMode.Unstake: {
        if (walletStakedBalance === undefined) {
          toast.error(t('error.loadingData'))
          return
        }

        setStakingLoading(true)

        // In the UI we display staked value as `amount_staked +
        // rewards` and is the value used to compute voting power. When we actually
        // process an unstake call, the contract expects this value in terms of
        // amount_staked.
        //
        // value = amount_staked * total_value / staked_total
        //
        // => amount_staked = staked_total * value / total_value
        let amountToUnstake =
          (Number(totalStakedBalance.total) * amount) / Number(totalValue.total)

        // We have limited precision and on the contract side division rounds
        // down, so division and multiplication don't commute. Handle the common
        // case here where someone is attempting to unstake all of their funds.
        if (
          Math.abs(
            walletStakedBalance -
              convertDenomToMicroDenomWithDecimals(
                amountToUnstake,
                governanceToken.decimals
              )
          ) <= 1
        ) {
          amountToUnstake = convertMicroDenomToDenomWithDecimals(
            walletStakedBalance,
            governanceToken.decimals
          )
        }

        try {
          const convertedAmount = convertDenomToMicroDenomStringWithDecimals(
            amountToUnstake,
            governanceToken.decimals
          )
          if (isOraichainCustomStaking) {
            await doOraichainUnbond({
              amount: convertedAmount,
              stakingToken: governanceToken.denomOrAddress,
            })
          } else {
            await doUnstake({
              amount: convertedAmount,
            })
          }

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshClaims?.()
          refreshDaoVotingPower()

          setAmount(0)
          toast.success(
            `Unstaked ${amount.toLocaleString(undefined, {
              maximumFractionDigits: governanceToken.decimals,
            })} $${governanceToken.symbol}`
          )

          // Close once done.
          onClose()
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        } finally {
          setStakingLoading(false)
        }

        break
      }
      case StakingMode.Claim: {
        if (sumClaimsAvailable === 0) {
          return toast.error('No claims available.')
        }

        setStakingLoading(true)
        try {
          if (isOraichainCustomStaking) {
            // Oraichain claiming is an unbond with zero amount.
            await doOraichainUnbond({
              amount: '0',
              stakingToken: governanceToken.denomOrAddress,
            })
          } else {
            await doClaim()
          }

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshClaims?.()

          setAmount(0)

          toast.success(
            `Claimed ${convertMicroDenomToDenomWithDecimals(
              sumClaimsAvailable || 0,
              governanceToken.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceToken.decimals,
            })} $${governanceToken.symbol}`
          )

          // Close once done.
          onClose()
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        } finally {
          setStakingLoading(false)
        }

        break
      }
      default:
        toast.error('Internal error while staking. Unrecognized mode.')
    }
  }

  return (
    <StatelessStakingModal
      amount={amount}
      claimableTokens={sumClaimsAvailable || 0}
      error={isWalletConnected ? undefined : t('error.logInToContinue')}
      initialMode={initialMode}
      loading={stakingLoading}
      loadingStakableTokens={
        !loadingUnstakedBalance || loadingUnstakedBalance.loading
          ? { loading: true }
          : {
              loading: false,
              data: BigNumber(loadingUnstakedBalance.data),
            }
      }
      loadingUnstakableTokens={
        !loadingWalletStakedValue || loadingWalletStakedValue.loading
          ? { loading: true }
          : {
              loading: false,
              data: BigNumber(loadingWalletStakedValue.data),
            }
      }
      onAction={onAction}
      onClose={onClose}
      proposalDeposit={
        maxDeposit
          ? convertMicroDenomToDenomWithDecimals(
              maxDeposit,
              governanceToken.decimals
            )
          : undefined
      }
      setAmount={(newAmount) => setAmount(newAmount)}
      token={governanceToken}
      unstakingDuration={unstakingDuration ?? null}
      visible={visible}
    />
  )
}
