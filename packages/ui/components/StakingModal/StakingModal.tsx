import { FC, useState } from 'react'

import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import {
  durationIsNonZero,
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'
import { XIcon } from '@heroicons/react/outline'

import { Modal } from '../Modal'
import { ActionButton } from './ActionButton'
import { AmountSelector } from './AmountSelector'
import { ModeButton } from './ModeButton'
import { PercentSelector } from './PercentSelector'

export enum StakingMode {
  Stake,
  Unstake,
  Claim,
}

export const stakingModeString = (mode: StakingMode) => {
  switch (mode) {
    case StakingMode.Stake:
      return 'stake'
    case StakingMode.Unstake:
      return 'unstake'
    case StakingMode.Claim:
      return 'claim'
    default:
      return 'internal error'
  }
}

export interface StakingModalProps {
  // The mode to start the staking modal in.
  defaultMode: StakingMode
  // The number of tokens in question.
  amount: number
  // Sets the number of tokens in question.
  setAmount: (newAmount: number) => void
  // Called when the staking modal is closed.
  onClose: () => void
  // The number of tokens that are currently claimable.
  claimableTokens: number
  // The number of tokens that are unstakable.
  unstakableTokens: number
  // The number of tokens that are stakable.
  stakableTokens: number
  // The duration for unstaking.
  unstakingDuration: Duration | null
  // Symbol for the token that is being staked.
  tokenSymbol: string
  // Decimals for the token that is being staked.
  tokenDecimals: number
  // Is there an error?
  error?: string | undefined
  // Are we ready to stake? Ex: is wallet connected?
  loading: boolean
  // Triggered when the stake / unstake / claim button is pressed.
  onAction: (mode: StakingMode, amount: number) => void
}

export const StakingModal: FC<StakingModalProps> = ({
  defaultMode,
  amount,
  setAmount,
  onClose,
  // microdenom
  claimableTokens,
  // macrodenom
  stakableTokens,
  // macrodenom
  unstakableTokens,
  unstakingDuration,
  tokenSymbol,
  tokenDecimals,
  loading,
  error,
  onAction,
}) => {
  const [mode, setMode] = useState(defaultMode)
  const canClaim = !!claimableTokens

  const maxTx = mode === StakingMode.Stake ? stakableTokens : unstakableTokens

  const invalidAmount = (): string | undefined => {
    if (mode === StakingMode.Claim) {
      return claimableTokens > 0 ? undefined : "Can't claim zero tokens."
    }
    if (amount <= 0) {
      return `Can't ${stakingModeString(mode)} zero tokens.`
    }
    if (amount > maxTx) {
      return `Can't ${stakingModeString(mode)} more tokens than you own.`
    }
  }
  error = error || invalidAmount()

  return (
    <Modal onClose={onClose}>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus cursor-auto">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="flex justify-between items-center">
          <h1 className="header-text">Manage staking</h1>
        </div>

        <div className="flex gap-1 py-[20px] mb-2 border-b border-inactive">
          <ModeButton
            active={mode === StakingMode.Stake}
            onClick={() => setMode(StakingMode.Stake)}
          >
            Stake
          </ModeButton>
          <ModeButton
            active={mode === StakingMode.Unstake}
            onClick={() => setMode(StakingMode.Unstake)}
          >
            Unstake
          </ModeButton>
          {canClaim && (
            <ModeButton
              active={mode === StakingMode.Claim}
              onClick={() => setMode(StakingMode.Claim)}
            >
              Claim
            </ModeButton>
          )}
        </div>
        {mode === StakingMode.Stake && (
          <AmountSelectionBody
            amount={amount}
            max={stakableTokens}
            setAmount={(amount: number) => setAmount(amount)}
            tokenDecimals={tokenDecimals}
          />
        )}
        {mode === StakingMode.Unstake && (
          <UnstakingModeBody
            amount={amount}
            max={unstakableTokens}
            setAmount={(amount: number) => setAmount(amount)}
            tokenDecimals={tokenDecimals}
            unstakingDuration={unstakingDuration}
          />
        )}
        {mode === StakingMode.Claim && (
          <ClaimBody
            amount={claimableTokens}
            tokenDecimals={tokenDecimals}
            tokenSymbol={tokenSymbol}
          />
        )}
        <div className="flex justify-end px-3 pt-6">
          <ActionButton
            error={error}
            loading={loading}
            mode={mode}
            onClick={() =>
              onAction(
                mode,
                mode === StakingMode.Claim ? claimableTokens : amount
              )
            }
          />
        </div>
      </div>
    </Modal>
  )
}

interface AmountSelectionProps {
  amount: number
  max: number
  setAmount: (newAmount: number) => void
  tokenDecimals: number
}

const AmountSelectionBody: FC<AmountSelectionProps> = ({
  amount,
  setAmount,
  max,
  tokenDecimals,
}) => (
  <div className="flex flex-col mt-5">
    <h2 className="mb-3 primary-text">Choose your token amount</h2>
    <AmountSelector amount={amount} max={max} setAmount={setAmount} />
    {amount > max && (
      <span className="mt-1 ml-1 text-error caption-text">
        Can{"'"}t stake more tokens than you own.
      </span>
    )}
    <span className="mt-4 font-mono caption-text">Max available {max}</span>
    <div className="mt-4">
      <PercentSelector
        amount={amount}
        max={max}
        setAmount={setAmount}
        tokenDecimals={tokenDecimals}
      />
    </div>
  </div>
)

const UnstakingModeBody: FC<
  AmountSelectionProps & { unstakingDuration: Duration | null }
> = ({ amount, setAmount, max, unstakingDuration, tokenDecimals }) => (
  <>
    <AmountSelectionBody
      amount={amount}
      max={max}
      setAmount={setAmount}
      tokenDecimals={tokenDecimals}
    />
    {unstakingDuration && durationIsNonZero(unstakingDuration) && (
      <>
        <hr className="mt-3" />
        <div className="mt-3">
          <h2 className="link-text">
            Unstaking period: {humanReadableDuration(unstakingDuration)}
          </h2>
          <p className="mt-3 secondary-text">
            There will be {humanReadableDuration(unstakingDuration)} between the
            time you decide to unstake your tokens and the time you can redeem
            them.
          </p>
        </div>
      </>
    )}
  </>
)

interface ClaimBodyProps {
  amount: number
  tokenDecimals: number
  tokenSymbol: string
}

const ClaimBody: FC<ClaimBodyProps> = ({
  amount,
  tokenSymbol,
  tokenDecimals,
}) => (
  <div className="flex flex-col py-3 px-6 mt-3">
    <h2 className="font-medium">
      {convertMicroDenomToDenomWithDecimals(amount, tokenDecimals)} $
      {tokenSymbol} available
    </h2>
    <p className="mt-3 mb-3 text-sm">
      Claim them to receive your unstaked tokens.
    </p>
  </div>
)
