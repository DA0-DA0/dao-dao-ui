import { FC, useState } from 'react'
import { Modal } from '../Modal'
import { ModeButton } from './ModeButton'
import { AmountSelector } from './AmountSelector'
import { PercentSelector } from './PercentSelector'
import { ActionButton } from './ActionButton'
import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import {
  durationIsNonZero,
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { XIcon } from '@heroicons/react/outline'

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
  unstakingDuration: Duration
  // Symbol for the token that is being staked.
  tokenSymbol: string
  // Decimals for the token that is being staked.
  tokenDecimals: number
  // Is there an error?
  error: string | undefined
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
  claimableTokens,
  stakableTokens,
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
    if (amount <= 0) {
      return `Can't ${stakingModeString(mode)} zero tokens.`
    }
    if (amount > maxTx) {
      return "Can't ${stakingModeString(mode)} more tokens than you own."
    }
    return undefined
  }
  error = error || invalidAmount()

  return (
    <Modal>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus">
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
            setAmount={(amount: number) => setAmount(amount)}
            max={stakableTokens}
            tokenDecimals={tokenDecimals}
          />
        )}
        {mode === StakingMode.Unstake && (
          <UnstakingModeBody
            amount={amount}
            setAmount={(amount: number) => setAmount(amount)}
            max={unstakableTokens}
            unstakingDuration={unstakingDuration}
            tokenDecimals={tokenDecimals}
          />
        )}
        {mode === StakingMode.Claim && canClaim && (
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
            onClick={() => onAction(mode, amount)}
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
  AmountSelectionProps & { unstakingDuration: Duration }
> = ({ amount, setAmount, max, unstakingDuration, tokenDecimals }) => (
  <>
    <AmountSelectionBody
      amount={amount}
      setAmount={setAmount}
      max={max}
      tokenDecimals={tokenDecimals}
    />
    {durationIsNonZero(unstakingDuration) && (
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
      {tokenSymbol} avaliable
    </h2>
    <p className="mt-3 mb-3 text-sm">
      Claim them to increase your voting power.
    </p>
  </div>
)
