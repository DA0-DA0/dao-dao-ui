import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { StakingMode, StakingModal as StatelessStakingModal } from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import {
  daoSelector,
  unstakingDuration as unstakingDurationSelector,
} from 'selectors/daos'
import {
  cw20TokenInfo,
  walletStakedTokenBalance,
  walletTokenBalance,
  walletTokenBalanceLoading,
  walletTokenBalanceUpdateCountAtom,
} from 'selectors/treasury'
import { cleanChainError } from 'util/cleanChainError'

function executeUnstakeAction(
  denomAmount: number,
  tokenInfo: TokenInfoResponse,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null | undefined,
  walletAddress: string | undefined,
  setLoading: SetterOrUpdater<boolean>,
  onSuccess: Function,
  onDone: Function
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }

  const amount = convertDenomToMicroDenomWithDecimals(
    denomAmount,
    tokenInfo.decimals
  )

  setLoading(true)
  signingClient
    ?.execute(
      walletAddress,
      stakingAddress,
      {
        unstake: {
          amount,
        },
      },
      'auto'
    )
    .then(() => onSuccess())
    .catch((err) => {
      toast.error(cleanChainError(err.message))
      console.error(err)
    })
    .finally(() => {
      setLoading(false)
      onDone()
    })
}

function executeStakeAction(
  denomAmount: number,
  tokenAddress: string,
  tokenInfo: TokenInfoResponse,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null | undefined,
  walletAddress: string | undefined,
  setLoading: SetterOrUpdater<boolean>,
  onSuccess: Function,
  onDone: Function
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }

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
    .then(() => onSuccess())
    .catch((err) => {
      toast.error(cleanChainError(err.message))
      console.error(err)
    })
    .finally(() => {
      setLoading(false)
      onDone()
    })
}

function executeClaimAction(
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null | undefined,
  walletAddress: string | undefined,
  setLoading: SetterOrUpdater<boolean>,
  onSuccess: Function,
  onDone: Function
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }

  setLoading(true)
  signingClient
    ?.execute(
      walletAddress,
      stakingAddress,
      {
        claim: {},
      },
      'auto'
    )
    .then(() => onSuccess())
    .catch((err) => {
      toast.error(cleanChainError(err.message))
      console.error(err)
    })
    .finally(() => {
      setLoading(false)
      onDone()
    })
}

export function StakingModal({
  defaultMode,
  contractAddress,
  claimableTokens,
  onClose,
  beforeExecute,
  afterExecute,
}: {
  defaultMode: StakingMode
  contractAddress: string
  claimableTokens: number
  onClose: () => void
  beforeExecute: Function
  afterExecute: Function
}) {
  const [amount, setAmount] = useState(0)

  const { address: walletAddress, signingClient } = useWallet()
  const [loading, setLoading] = useState(false)

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(cw20TokenInfo(daoInfo?.gov_token))
  const govTokenBalance = convertMicroDenomToDenomWithDecimals(
    useRecoilValue(walletTokenBalance(daoInfo?.gov_token)).amount,
    tokenInfo.decimals
  )
  const tokenBalanceLoading = useRecoilValue(
    walletTokenBalanceLoading(walletAddress ?? '')
  )

  const stakedGovTokenBalance = convertMicroDenomToDenomWithDecimals(
    useRecoilValue(walletStakedTokenBalance(daoInfo?.staking_contract)).amount,
    tokenInfo.decimals
  )
  const unstakingDuration = useRecoilValue(
    unstakingDurationSelector(daoInfo.staking_contract)
  )
  const setWalletTokenBalanceUpdateCount = useSetRecoilState(
    walletTokenBalanceUpdateCountAtom(walletAddress ?? '')
  )

  const walletDisconnected = (): string | undefined => {
    if (!signingClient || !walletAddress) {
      return 'Please connect your wallet'
    }
    return undefined
  }

  const error = walletDisconnected()

  const onAction = (mode: StakingMode, amount: number) => {
    beforeExecute()
    switch (mode) {
      case StakingMode.Stake:
        executeStakeAction(
          amount,
          daoInfo.gov_token,
          tokenInfo,
          daoInfo.staking_contract,
          signingClient,
          walletAddress,
          setLoading,
          async () => {
            // New staking balances will not appear until the next block has been added.
            await new Promise((resolve) => setTimeout(resolve, 6500))

            setAmount(0)
            setWalletTokenBalanceUpdateCount((p) => p + 1)
            toast.success(`Staked ${amount.toLocaleString()} tokens`)
          },
          afterExecute
        )
        break
      case StakingMode.Unstake:
        executeUnstakeAction(
          amount,
          tokenInfo,
          daoInfo.staking_contract,
          signingClient,
          walletAddress,
          setLoading,
          async () => {
            // New staking balances will not appear until the next block has been added.
            await new Promise((resolve) => setTimeout(resolve, 6500))

            setAmount(0)
            setWalletTokenBalanceUpdateCount((p) => p + 1)
            toast.success(`Unstaked ${amount.toLocaleString()} tokens`)
          },
          afterExecute
        )
        break
      case StakingMode.Claim:
        executeClaimAction(
          daoInfo.staking_contract,
          signingClient,
          walletAddress,
          setLoading,
          async () => {
            // New staking balances will not appear until the next block has been added.
            await new Promise((resolve) => setTimeout(resolve, 6500))

            setWalletTokenBalanceUpdateCount((p) => p + 1)
            toast.success(
              `Claimed ${convertMicroDenomToDenomWithDecimals(
                amount,
                tokenInfo.decimals
              ).toLocaleString()} tokens`
            )
          },
          afterExecute
        )
        break
      default:
        toast.error('Internal error while staking. Unrecognized mode.')
    }
  }

  return (
    <StatelessStakingModal
      amount={amount}
      claimableTokens={claimableTokens}
      defaultMode={defaultMode}
      error={error}
      loading={loading || tokenBalanceLoading}
      onAction={onAction}
      onClose={onClose}
      setAmount={(newAmount) => setAmount(newAmount)}
      stakableTokens={govTokenBalance}
      tokenDecimals={tokenInfo.decimals}
      tokenSymbol={tokenInfo.symbol}
      unstakableTokens={stakedGovTokenBalance}
      unstakingDuration={unstakingDuration}
    />
  )
}
