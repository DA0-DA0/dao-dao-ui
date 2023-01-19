import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
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
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  processError,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import {
  Cw20BaseHooks,
  Cw20StakeHooks,
  useAwaitNextBlock,
  useWalletInfo,
} from '../../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { useGovernanceTokenInfo, useStakingInfo } from '../../hooks'

export const StakingModal = (props: BaseStakingModalProps) => (
  <SuspenseLoader fallback={<ModalLoader onClose={props.onClose} />}>
    <InnerStakingModal {...props} />
  </SuspenseLoader>
)

const InnerStakingModal = ({
  initialMode = StakingMode.Stake,
  onClose,
  maxDeposit,
}: BaseStakingModalProps) => {
  const { t } = useTranslation()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletInfo()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)

  const {
    governanceTokenAddress,
    governanceTokenInfo,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceTokenInfo({
    fetchLoadingWalletBalance: true,
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
    fetchLoadingWalletStakedValue: true,
  })

  const totalStakedBalance = useRecoilValue(
    Cw20StakeSelectors.totalStakedAtHeightSelector({
      contractAddress: stakingContractAddress,
      params: [{}],
    })
  )

  const walletStakedBalanceLoadable = useCachedLoadable(
    walletAddress
      ? Cw20StakeSelectors.stakedBalanceAtHeightSelector({
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

  const totalValue = useRecoilValue(
    Cw20StakeSelectors.totalValueSelector({
      contractAddress: stakingContractAddress,
      params: [],
    })
  )

  if (
    sumClaimsAvailable === undefined ||
    loadingUnstakedBalance === undefined ||
    loadingWalletStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  const [amount, setAmount] = useState(0)

  const doStake = Cw20BaseHooks.useSend({
    contractAddress: governanceTokenAddress,
    sender: walletAddress ?? '',
  })
  const doUnstake = Cw20StakeHooks.useUnstake({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })
  const doClaim = Cw20StakeHooks.useClaim({
    contractAddress: stakingContractAddress,
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
    if (!connected) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setStakingLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        setStakingLoading(true)

        try {
          await doStake({
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              governanceTokenInfo.decimals
            ).toString(),
            contract: stakingContractAddress,
            msg: btoa('{"stake": {}}'),
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshDaoVotingPower()

          setAmount(0)
          toast.success(
            `Staked ${amount.toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })} $${governanceTokenInfo.symbol}`
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
                governanceTokenInfo.decimals
              )
          ) <= 1
        ) {
          amountToUnstake = convertMicroDenomToDenomWithDecimals(
            walletStakedBalance,
            governanceTokenInfo.decimals
          )
        }

        try {
          await doUnstake({
            amount: convertDenomToMicroDenomWithDecimals(
              amountToUnstake,
              governanceTokenInfo.decimals
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
              maximumFractionDigits: governanceTokenInfo.decimals,
            })} $${governanceTokenInfo.symbol}`
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
            `Claimed ${convertMicroDenomToDenomWithDecimals(
              sumClaimsAvailable,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })} $${governanceTokenInfo.symbol}`
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
      claimableTokens={sumClaimsAvailable}
      error={connected ? undefined : t('error.connectWalletToContinue')}
      initialMode={initialMode}
      loading={stakingLoading}
      loadingStakableTokens={
        loadingUnstakedBalance.loading
          ? { loading: true }
          : {
              loading: false,
              data: convertMicroDenomToDenomWithDecimals(
                loadingUnstakedBalance.data,
                governanceTokenInfo.decimals
              ),
            }
      }
      loadingUnstakableTokens={
        loadingWalletStakedValue.loading
          ? { loading: true }
          : {
              loading: false,
              data: convertMicroDenomToDenomWithDecimals(
                loadingWalletStakedValue.data,
                governanceTokenInfo.decimals
              ),
            }
      }
      onAction={onAction}
      onClose={onClose}
      proposalDeposit={
        maxDeposit
          ? convertMicroDenomToDenomWithDecimals(
              maxDeposit,
              governanceTokenInfo.decimals
            )
          : undefined
      }
      setAmount={(newAmount) => setAmount(newAmount)}
      tokenDecimals={governanceTokenInfo.decimals}
      tokenSymbol={governanceTokenInfo.symbol}
      unstakingDuration={unstakingDuration ?? null}
    />
  )
}
