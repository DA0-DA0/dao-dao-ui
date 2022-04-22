import { useState, FunctionComponent } from 'react'

import { constSelector, SetterOrUpdater, useRecoilValue } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import {
  useWallet,
  blockHeightSelector,
  govTokenInfoSelector,
} from '@dao-dao/state'
import { useClaim, useUnstake } from '@dao-dao/state/hooks/stake-cw20'
import { votingModuleSelector } from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import {
  stakingContractSelector,
  tokenContractSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import {
  claimsSelector,
  getConfigSelector,
} from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { StakingMode, StakingModal as StatelessStakingModal } from '@dao-dao/ui'
import {
  claimAvailable,
  convertDenomToMicroDenomWithDecimals,
} from '@dao-dao/utils'
import toast from 'react-hot-toast'

import { cleanChainError } from '@/util/cleanChainError'
import { DAO_ADDRESS } from '@/util/constants'

const executeStakeAction = async (
  denomAmount: number,
  tokenAddress: string,
  tokenInfo: TokenInfoResponse,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) => {
  const amount = convertDenomToMicroDenomWithDecimals(
    denomAmount,
    tokenInfo.decimals
  )
  setLoading(true)
  signingClient
    ?.execute(
      walletAddress,
      tokenAddress,
      {
        send: {
          owner: walletAddress,
          contract: stakingAddress,
          amount: amount,
          msg: btoa('{"stake": {}}'),
        },
      },
      'auto'
    )
    .catch((err) => {
      toast.error(cleanChainError(err.message))
      console.log(err.message)
    })
    .finally(() => {
      setLoading(false)
      toast.success(`Staked ${denomAmount} tokens`)
      onDone()
    })
}

interface StakingModalProps {
  defaultMode: StakingMode
  onClose: () => void
}

export const StakingModal: FunctionComponent<StakingModalProps> = ({
  defaultMode,
  onClose,
}) => {
  const { address: walletAddress, connected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)

  const unstakedBalance = 2500.1234
  const stakedBalance = 1025.4321

  // const daoConfig = useRecoilValue(
  //   configSelector({ contractAddress: DAO_ADDRESS })
  // )
  const votingPowerModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: DAO_ADDRESS })
  )
  const tokenContractAddress = useRecoilValue(
    votingPowerModuleAddress
      ? tokenContractSelector({ contractAddress: votingPowerModuleAddress })
      : constSelector(undefined)
  )
  const stakingContractAddress = useRecoilValue(
    votingPowerModuleAddress
      ? stakingContractSelector({ contractAddress: votingPowerModuleAddress })
      : constSelector(undefined)
  )
  const stakingContractConfig = useRecoilValue(
    stakingContractAddress
      ? getConfigSelector({ contractAddress: stakingContractAddress })
      : constSelector(undefined)
  )
  const tokenInfo = useRecoilValue(
    tokenContractAddress
      ? govTokenInfoSelector(tokenContractAddress)
      : constSelector(undefined)
  )

  const unstakingDuration = stakingContractConfig?.unstaking_duration

  const blockHeight = useRecoilValue(blockHeightSelector)
  const claims =
    useRecoilValue(
      walletAddress && stakingContractAddress
        ? claimsSelector({
            contractAddress: stakingContractAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    )?.claims ?? []
  const sumClaimsAvailable =
    blockHeight !== undefined
      ? claims
          .filter((c) => claimAvailable(c, blockHeight))
          .reduce((p, c) => p + Number(c.amount), 0)
      : 0

  const doUnstake = useUnstake({
    contractAddress: stakingContractAddress ?? '',
    sender: walletAddress ?? '',
  })
  const doClaim = useClaim({
    contractAddress: stakingContractAddress ?? '',
    sender: walletAddress ?? '',
  })

  const onAction = async (mode: StakingMode, amount: number) => {
    if (!connected || !tokenInfo || !stakingContractAddress) return

    setLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          tokenInfo.decimals
        )

        setLoading(true)
        try {
          // await doStake({ amount: microAmount })
          toast.success(`Unstaked ${amount} tokens`)
        } catch (err) {
          toast.error(cleanChainError(err.message))
        }

        // setLoading(false)
        // setAmount(0)

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
          tokenInfo.decimals
        )

        setLoading(true)
        try {
          await doUnstake({ amount: microAmount })
          toast.success(`Unstaked ${amount} tokens`)
        } catch (err) {
          toast.error(cleanChainError(err.message))
        }

        // setLoading(false)
        // setAmount(0)

        // TODO: Figure out what to do about this.
        // New staking balances will not appear until the next block has been added.
        // setTimeout(() => {
        //   setWalletTokenBalanceUpdateCount((p) => p + 1)
        // }, 6500)

        break
      }
      case StakingMode.Claim: {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          tokenInfo.decimals
        )

        setLoading(true)
        try {
          await doClaim({ amount: microAmount })
          toast.success(`Unstaked ${amount} tokens`)
        } catch (err) {
          toast.error(cleanChainError(err.message))
        }

        // setLoading(false)
        // setAmount(0)

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
  if (!tokenInfo) return null

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
      tokenDecimals={tokenInfo.decimals}
      tokenSymbol={tokenInfo.symbol}
      unstakableTokens={stakedBalance}
      unstakingDuration={unstakingDuration}
    />
  )
}
