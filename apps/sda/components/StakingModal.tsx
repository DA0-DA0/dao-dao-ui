import { XIcon } from '@heroicons/react/outline'
import { useState, FunctionComponent } from 'react'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValue } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { useSend } from '@dao-dao/state/hooks/cw20-base'
import { useClaim, useUnstake } from '@dao-dao/state/hooks/stake-cw20'
import {
  totalStakedAtHeightSelector,
  totalValueSelector,
} from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import {
  StakingMode,
  StakingModal as StatelessStakingModal,
  Modal,
} from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { Loader, SuspenseLoader, WalletConnectButton } from '.'
import { useGovernanceTokenInfo, useStakingInfo } from '@/hooks'
import { cleanChainError } from '@/util'

interface StakingModalProps {
  defaultMode: StakingMode
  onClose: () => void
}

export const StakingModal: FunctionComponent<StakingModalProps> = (props) => (
  <SuspenseLoader fallback={<StakingModalLoader {...props} />}>
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
    refreshStakingContractBalances,
    refreshTotals,
    sumClaimsAvailable,
    walletBalance: stakedBalance,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletBalance: true,
  })

  const totalStaked = useRecoilValue(
    stakingContractAddress
      ? totalStakedAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )

  const totalValue = useRecoilValue(
    stakingContractAddress
      ? totalValueSelector({ contractAddress: stakingContractAddress })
      : constSelector(undefined)
  )

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
    if (
      !connected ||
      !governanceTokenInfo ||
      !stakingContractAddress ||
      !totalValue ||
      !totalStaked
    )
      return

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

          // TODO: Figure out better solution for detecting block.
          // New balances will not appear until the next block.
          setTimeout(() => {
            refreshBalances()
            refreshTotals()
            refreshStakingContractBalances()

            setAmount(0)
            setLoading(false)
            toast.success(`Staked ${amount} token${amount === 1 ? '' : 's'}`)

            // Close once done.
            onClose()
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

        // In the UI we display staked value as this is `amount_staked +
        // rewards` and is the value used to compute voting power. When we actually
        // process an unstake call the contract expects this value in terms of
        // amount_staked.
        //
        // value = amount_staked * total_value / staked_total
        //
        // => amount_staked = staked_total * value / total_value
        const amountToUnstake =
          (Number(totalStaked.total) * amount) / Number(totalValue.total)

        try {
          await doUnstake({
            amount: convertDenomToMicroDenomWithDecimals(
              amountToUnstake.toString(),
              governanceTokenInfo.decimals
            ),
          })

          // TODO: Figure out better solution for detecting block.
          // New balances will not appear until the next block.
          setTimeout(() => {
            refreshBalances()
            refreshTotals()
            refreshStakingContractBalances()

            setAmount(0)
            setLoading(false)
            toast.success(`Unstaked ${amount} token${amount === 1 ? '' : 's'}`)

            // Close once done.
            onClose()
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

          // TODO: Figure out better solution for detecting block.
          // New balances will not appear until the next block.
          setTimeout(() => {
            refreshBalances()
            refreshTotals()
            refreshClaims?.()
            refreshStakingContractBalances()

            setAmount(0)
            setLoading(false)
            toast.success(
              `Claimed ${sumClaimsAvailable} token${
                sumClaimsAvailable === 1 ? '' : 's'
              }`
            )

            // Close once done.
            onClose()
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

  // If not connected, show connect button.
  if (!connected) {
    return (
      <StakingModalWrapper onClose={onClose}>
        <WalletConnectButton />
      </StakingModalWrapper>
    )
  }

  // Don't render until ready.
  if (
    !governanceTokenInfo ||
    !stakingContractConfig ||
    sumClaimsAvailable === undefined ||
    unstakedBalance === undefined ||
    stakedBalance === undefined
  ) {
    return <StakingModalLoader onClose={onClose} />
  }

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

type StakingModalWrapperProps = Pick<StakingModalProps, 'onClose'>
const StakingModalWrapper: FunctionComponent<StakingModalWrapperProps> = ({
  children,
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

      {children}
    </div>
  </Modal>
)

const StakingModalLoader: FunctionComponent<
  Omit<StakingModalWrapperProps, 'children'>
> = (props) => (
  <StakingModalWrapper {...props}>
    <div className="animate-spin">
      <Loader size={40} />
    </div>
  </StakingModalWrapper>
)
