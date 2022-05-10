import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { StakingMode, StakingModal as StatelessStakingModal } from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
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
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) {
  if (!signingClient) {
    toast.error('Please connect your wallet')
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
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
    .finally(() => {
      setLoading(false)
      toast.success(`Unstaked ${denomAmount} tokens`)
      onDone()
    })
}

function executeStakeAction(
  denomAmount: number,
  tokenAddress: string,
  tokenInfo: TokenInfoResponse,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) {
  if (!signingClient) {
    toast.error('Please connect your wallet')
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

function executeClaimAction(
  denomAmount: number,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) {
  if (!signingClient) {
    toast.error('Please connect your wallet')
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
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
    .finally(() => {
      setLoading(false)
      toast.success(`Claimed ${denomAmount} tokens`)
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

  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const [loading, setLoading] = useState(false)

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(cw20TokenInfo(daoInfo?.gov_token))
  const govTokenBalance = convertMicroDenomToDenomWithDecimals(
    useRecoilValue(walletTokenBalance(daoInfo?.gov_token)).amount,
    tokenInfo.decimals
  )
  const tokenBalanceLoading = useRecoilValue(
    walletTokenBalanceLoading(walletAddress)
  )

  const stakedGovTokenBalance = convertMicroDenomToDenomWithDecimals(
    useRecoilValue(walletStakedTokenBalance(daoInfo?.staking_contract)).amount,
    tokenInfo.decimals
  )
  const unstakingDuration = useRecoilValue(
    unstakingDurationSelector(daoInfo.staking_contract)
  )
  const setWalletTokenBalanceUpdateCount = useSetRecoilState(
    walletTokenBalanceUpdateCountAtom(walletAddress)
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
          () => {
            setAmount(0)
            // New staking balances will not appear until the next block has been added.
            setTimeout(() => {
              setWalletTokenBalanceUpdateCount((p) => p + 1)
              afterExecute()
            }, 6000)
          }
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
          () => {
            setAmount(0)
            // New staking balances will not appear until the next block has been added.
            setTimeout(() => {
              setWalletTokenBalanceUpdateCount((p) => p + 1)
              afterExecute()
            }, 6500)
          }
        )
        break
      case StakingMode.Claim:
        executeClaimAction(
          convertMicroDenomToDenomWithDecimals(amount, tokenInfo.decimals),
          daoInfo.staking_contract,
          signingClient,
          walletAddress,
          setLoading,
          () => {
            setTimeout(() => {
              setWalletTokenBalanceUpdateCount((p) => p + 1)
              afterExecute()
            }, 6500)
          }
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
