import { useState, FunctionComponent } from 'react'

import { useWallet } from '@dao-dao/state'
import { useSend } from '@dao-dao/state/hooks/cw20-base'
import { useClaim, useUnstake } from '@dao-dao/state/hooks/stake-cw20'
import {
  StakingMode,
  StakingModal as StatelessStakingModal,
  Modal,
} from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'
import { XIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

import { Logo, SuspenseLoader } from '.'
import { useGovernanceTokenInfo, useStakingInfo } from '@/hooks'
import { cleanChainError } from '@/util'

interface StakingModalProps {
  defaultMode: StakingMode
  onClose: () => void
}

export const StakingModal: FunctionComponent<StakingModalProps> = (props) => (
  <SuspenseLoader fallback={<LoadingStakingModal {...props} />}>
    <InnerStakingModal {...props} />
  </SuspenseLoader>
)

const InnerStakingModal: FunctionComponent<StakingModalProps> = ({
  defaultMode,
  onClose,
}) => {
  const { address: walletAddress, connected, refreshBalances } = useWallet()

  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)

  const {
    governanceTokenAddress,
    governanceTokenInfo,
    walletBalance: unstakedBalance,
  } = useGovernanceTokenInfo({
    fetchWalletBalance: true,
  })
  const {
    stakingContractAddress,
    stakingContractConfig,
    refreshTotals,
    sumClaimsAvailable,
    walletBalance: stakedBalance,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletBalance: true,
  })

  const doStake = useSend({
    contractAddress: governanceTokenAddress ?? '',
    sender: walletAddress ?? '',
  })
  const doUnstake = useUnstake({
    contractAddress: stakingContractAddress ?? '',
    sender: walletAddress ?? '',
  })
  const doClaim = useClaim({
    contractAddress: stakingContractAddress ?? '',
    sender: walletAddress ?? '',
  })

  const onAction = async (mode: StakingMode, amount: number) => {
    if (!connected || !governanceTokenInfo || !stakingContractAddress) return

    setLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        setLoading(true)

        try {
          await doStake({
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              governanceTokenInfo.decimals
            ),
            contract: stakingContractAddress,
            msg: btoa('{"stake":{}}'),
          })
          toast.success(`Staked ${amount} tokens`)
          setAmount(0)
          // New staking balances will not appear until the next block has been added.
          setTimeout(() => {
            refreshBalances()
            refreshTotals()
            setLoading(false)
          }, 6500)
        } catch (err) {
          console.error(err)
          toast.error(cleanChainError(err.message))
          setLoading(false)
        }

        break
      }
      case StakingMode.Unstake: {
        setLoading(true)

        try {
          await doUnstake({
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              governanceTokenInfo.decimals
            ),
          })
          toast.success(`Unstaked ${amount} tokens`)

          setAmount(0)
          // New staking balances will not appear until the next block has been added.
          setTimeout(() => {
            refreshBalances()
            refreshTotals()
            setLoading(false)
          }, 6500)
        } catch (err) {
          console.error(err)
          toast.error(cleanChainError(err.message))
          setLoading(false)
        }

        break
      }
      case StakingMode.Claim: {
        if (sumClaimsAvailable === 0) {
          return toast.error('No claims available.')
        }

        setLoading(true)
        try {
          await doClaim()
          toast.success(`Claimed ${sumClaimsAvailable} tokens`)

          setAmount(0)
          // New staking balances will not appear until the next block has been added.
          setTimeout(() => {
            refreshBalances()
            refreshTotals()
            refreshClaims?.()
            setLoading(false)
          }, 6500)
        } catch (err) {
          console.error(err)
          toast.error(cleanChainError(err.message))
          setLoading(false)
        }

        break
      }
      default:
        toast.error('Internal error while staking. Unrecognized mode.')
    }
  }

  // Don't render until ready.
  if (
    !governanceTokenInfo ||
    !stakingContractConfig ||
    sumClaimsAvailable === undefined ||
    unstakedBalance === undefined ||
    stakedBalance === undefined
  )
    return null

  return (
    <StatelessStakingModal
      amount={amount}
      claimableTokens={sumClaimsAvailable}
      defaultMode={defaultMode}
      error={connected ? undefined : 'Please connect your wallet.'}
      loading={loading}
      onAction={onAction}
      onClose={onClose}
      setAmount={(newAmount) => setAmount(newAmount)}
      stakableTokens={convertMicroDenomToDenomWithDecimals(
        unstakedBalance,
        governanceTokenInfo.decimals
      )}
      tokenDecimals={governanceTokenInfo.decimals}
      tokenSymbol={governanceTokenInfo.symbol}
      unstakableTokens={convertMicroDenomToDenomWithDecimals(
        stakedBalance,
        governanceTokenInfo.decimals
      )}
      unstakingDuration={stakingContractConfig.unstaking_duration ?? null}
    />
  )
}

const LoadingStakingModal: FunctionComponent<StakingModalProps> = ({
  onClose,
}) => (
  <Modal onClose={onClose}>
    <div className="relative p-40 bg-white rounded-lg border border-focus cursor-auto">
      <button
        className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
        onClick={onClose}
      >
        <XIcon className="w-4 h-4" />
      </button>

      <div className="animate-spin">
        <Logo height={40} width={40} />
      </div>
    </div>
  </Modal>
)
