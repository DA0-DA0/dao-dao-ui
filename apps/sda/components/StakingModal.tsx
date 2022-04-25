import { useState, FunctionComponent } from 'react'

import { useWallet } from '@dao-dao/state'
import { useSend } from '@dao-dao/state/hooks/cw20-base'
import { useClaim, useUnstake } from '@dao-dao/state/hooks/stake-cw20'
import {
  StakingMode,
  StakingModal as StatelessStakingModal,
  Modal,
} from '@dao-dao/ui'
import { convertDenomToMicroDenomWithDecimals } from '@dao-dao/utils'
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
  const { address: walletAddress, connected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)

  const unstakedBalance = 2500.1234
  const stakedBalance = 1025.4321

  const { governanceTokenContractAddress, governanceTokenInfo } =
    useGovernanceTokenInfo()
  const { stakingContractAddress, stakingContractConfig, sumClaimsAvailable } =
    useStakingInfo({ fetchClaims: true })

  const doStake = useSend({
    contractAddress: governanceTokenContractAddress ?? '',
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
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          governanceTokenInfo.decimals
        )

        setLoading(true)

        try {
          await doStake({
            amount: microAmount,
            contract: stakingContractAddress,
            msg: btoa('{"stake":{}}'),
          })
          toast.success(`Staked ${amount} tokens`)
          setAmount(0)
        } catch (err) {
          toast.error(cleanChainError(err.message))
        }

        setLoading(false)

        // TODO: Figure out what to do about this.
        // New staking balances will not appear until the next block has been added.
        // setTimeout(() => {
        //   setWalletTokenBalanceUpdateCount((p) => p + 1)
        // }, 6500)

        break
      }
      case StakingMode.Unstake: {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          governanceTokenInfo.decimals
        )

        setLoading(true)
        try {
          await doUnstake({ amount: microAmount })
          toast.success(`Unstaked ${amount} tokens`)
          setAmount(0)
        } catch (err) {
          toast.error(cleanChainError(err.message))
        }

        setLoading(false)

        // TODO: Figure out what to do about this.
        // New staking balances will not appear until the next block has been added.
        // setTimeout(() => {
        //   setWalletTokenBalanceUpdateCount((p) => p + 1)
        // }, 6500)

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
        } catch (err) {
          toast.error(cleanChainError(err.message))
        }

        setLoading(false)

        // TODO: Figure out what to do about this.
        // New staking balances will not appear until the next block has been added.
        // setTimeout(() => {
        //   setWalletTokenBalanceUpdateCount((p) => p + 1)
        // }, 6500)

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
    sumClaimsAvailable === undefined
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
      stakableTokens={unstakedBalance}
      tokenDecimals={governanceTokenInfo.decimals}
      tokenSymbol={governanceTokenInfo.symbol}
      unstakableTokens={stakedBalance}
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
