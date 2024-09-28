import { coins } from '@cosmjs/stargate'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  refreshDaoVotingPowerAtom,
  refreshFollowingDaosAtom,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  ModalLoader,
  StakingModal as StatelessStakingModal,
} from '@dao-dao/stateless'
import { BaseStakingModalProps, StakingMode } from '@dao-dao/types'
import { CHAIN_GAS_MULTIPLIER, processError } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  DaoVotingTokenStakedHooks,
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
  visible,
  onClose,
  initialMode = StakingMode.Stake,
  maxDeposit,
}: BaseStakingModalProps) => {
  const { t } = useTranslation()
  const {
    address: walletAddress,
    isWalletConnected,
    refreshBalances,
  } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)

  const { governanceToken, loadingWalletBalance: loadingUnstakedBalance } =
    useGovernanceTokenInfo({
      fetchWalletBalance: true,
    })
  const {
    unstakingDuration,
    refreshTotals,
    sumClaimsAvailable,
    loadingWalletStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
  })

  const [amount, setAmount] = useState(0)

  const doStake = DaoVotingTokenStakedHooks.useStake({
    contractAddress: votingModuleAddress,
    sender: walletAddress ?? '',
  })
  const doUnstake = DaoVotingTokenStakedHooks.useUnstake({
    contractAddress: votingModuleAddress,
    sender: walletAddress ?? '',
  })
  const doClaim = DaoVotingTokenStakedHooks.useClaim({
    contractAddress: votingModuleAddress,
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
          await doStake(
            CHAIN_GAS_MULTIPLIER,
            undefined,
            coins(
              HugeDecimal.fromHumanReadable(
                amount,
                governanceToken.decimals
              ).toString(),
              governanceToken.denomOrAddress
            )
          )

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
        setStakingLoading(true)

        try {
          await doUnstake({
            amount: HugeDecimal.fromHumanReadable(
              amount,
              governanceToken.decimals
            ).toString(),
          })

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
          await doClaim()

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshClaims?.()

          setAmount(0)

          toast.success(
            `Claimed ${HugeDecimal.from(sumClaimsAvailable || 0)
              .toHumanReadableNumber(governanceToken.decimals)
              .toLocaleString(undefined, {
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
              data: HugeDecimal.from(loadingUnstakedBalance.data),
            }
      }
      loadingUnstakableTokens={
        !loadingWalletStakedValue || loadingWalletStakedValue.loading
          ? { loading: true }
          : {
              loading: false,
              data: HugeDecimal.from(loadingWalletStakedValue.data),
            }
      }
      onAction={onAction}
      onClose={onClose}
      proposalDeposit={maxDeposit ? HugeDecimal.from(maxDeposit) : undefined}
      setAmount={(newAmount) => setAmount(newAmount)}
      token={governanceToken}
      unstakingDuration={unstakingDuration ?? null}
      visible={visible}
    />
  )
}
