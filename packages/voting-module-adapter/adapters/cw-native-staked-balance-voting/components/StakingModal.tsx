import { coins } from '@cosmjs/stargate'
import { useWallet } from '@noahsaso/cosmodal'
import { PropsWithChildren, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { ConnectWalletButton } from '@dao-dao/common'
import {
  CwNativeStakedBalanceVotingHooks,
  stakingLoadingAtom,
  useWalletBalance,
} from '@dao-dao/state'
import {
  Modal,
  StakingMode,
  StakingModal as StatelessStakingModal,
  SuspenseLoader,
} from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  processError,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseStakingModalProps } from '../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'

export const StakingModal = (props: BaseStakingModalProps) => (
  <SuspenseLoader fallback={<StakingModalLoader {...props} />}>
    <InnerStakingModal {...props} />
  </SuspenseLoader>
)

const InnerStakingModal = ({
  mode,
  onClose,
  deposit,
}: BaseStakingModalProps) => {
  const { t } = useTranslation()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletBalance()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)

  const {
    governanceTokenAddress,
    governanceTokenInfo,
    walletBalance: unstakedBalance,
  } = useGovernanceTokenInfo({
    fetchWalletBalance: true,
  })
  const {
    unstakingDuration,
    refreshStakingContractBalances,
    refreshTotals,
    sumClaimsAvailable,
    walletStakedValue,
    totalStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
    fetchTotalStakedValue: true,
  })

  if (
    sumClaimsAvailable === undefined ||
    unstakedBalance === undefined ||
    walletStakedValue === undefined ||
    totalStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  // When staking, default to all unstaked balance (less proposal deposit if
  // exists).
  const [amount, setAmount] = useState(
    mode === StakingMode.Stake
      ? convertMicroDenomToDenomWithDecimals(
          !!deposit && Number(deposit) > 0 && unstakedBalance > Number(deposit)
            ? unstakedBalance - Number(deposit)
            : unstakedBalance,
          governanceTokenInfo.decimals
        )
      : 0
  )

  const doStake = CwNativeStakedBalanceVotingHooks.useStake({
    contractAddress: votingModuleAddress,
    sender: walletAddress ?? '',
  })
  const doUnstake = CwNativeStakedBalanceVotingHooks.useUnstake({
    contractAddress: votingModuleAddress,
    sender: walletAddress ?? '',
  })
  const doClaim = CwNativeStakedBalanceVotingHooks.useClaim({
    contractAddress: votingModuleAddress,
    sender: walletAddress ?? '',
  })

  const onAction = async (mode: StakingMode, amount: number) => {
    if (!connected) {
      toast.error(t('error.connectWalletToContinue'))
    }

    setStakingLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        setStakingLoading(true)

        try {
          await doStake(
            'auto',
            undefined,
            coins(
              convertDenomToMicroDenomWithDecimals(
                amount,
                governanceTokenInfo.decimals
              ),
              governanceTokenAddress
            )
          )

          // TODO: Figure out better solution for detecting block.
          // New balances will not appear until the next block.
          await new Promise((resolve) => setTimeout(resolve, 6500))

          refreshBalances()
          refreshTotals()
          refreshStakingContractBalances()

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
        setStakingLoading(true)

        try {
          await doUnstake({
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              governanceTokenInfo.decimals
            ),
          })

          // TODO: Figure out better solution for detecting block.
          // New balances will not appear until the next block.
          await new Promise((resolve) => setTimeout(resolve, 6500))

          refreshBalances()
          refreshTotals()
          refreshClaims?.()
          refreshStakingContractBalances()

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

          // TODO: Figure out better solution for detecting block.
          // New balances will not appear until the next block.
          await new Promise((resolve) => setTimeout(resolve, 6500))

          refreshBalances()
          refreshTotals()
          refreshClaims?.()
          refreshStakingContractBalances()

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

  // If not connected, show connect button.
  if (!connected) {
    return (
      <StakingModalWrapper onClose={onClose}>
        <ConnectWalletButton />
      </StakingModalWrapper>
    )
  }

  return (
    <StatelessStakingModal
      amount={amount}
      claimableTokens={sumClaimsAvailable}
      error={connected ? undefined : 'Please connect your wallet.'}
      loading={stakingLoading}
      mode={mode}
      onAction={onAction}
      onClose={onClose}
      proposalDeposit={
        deposit
          ? convertMicroDenomToDenomWithDecimals(
              deposit,
              governanceTokenInfo.decimals
            )
          : undefined
      }
      setAmount={(newAmount) => setAmount(newAmount)}
      stakableTokens={convertMicroDenomToDenomWithDecimals(
        unstakedBalance,
        governanceTokenInfo.decimals
      )}
      tokenDecimals={governanceTokenInfo.decimals}
      tokenSymbol={governanceTokenInfo.symbol}
      unstakableTokens={convertMicroDenomToDenomWithDecimals(
        walletStakedValue,
        governanceTokenInfo.decimals
      )}
      unstakingDuration={unstakingDuration ?? null}
    />
  )
}

type StakingModalWrapperProps = PropsWithChildren<
  Pick<BaseStakingModalProps, 'onClose'>
>

export const StakingModalWrapper = ({
  children,
  onClose,
}: StakingModalWrapperProps) => (
  <Modal containerClassName="!p-40" onClose={onClose}>
    {children}
  </Modal>
)

const StakingModalLoader = (
  props: Omit<StakingModalWrapperProps, 'children'>
) => {
  const { Loader } = useVotingModuleAdapterOptions()

  return (
    <StakingModalWrapper {...props}>
      <Loader />
    </StakingModalWrapper>
  )
}
