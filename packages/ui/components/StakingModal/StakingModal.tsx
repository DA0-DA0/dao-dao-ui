import { FC, useState } from 'react'

import i18n from '@dao-dao/i18n'
import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import {
  durationIsNonZero,
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

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
      return claimableTokens > 0
        ? undefined
        : i18n.t('error.cannotTxZeroTokens')
    }
    if (amount <= 0) {
      return i18n.t('error.cannotTxZeroTokens')
    }
    if (amount > maxTx) {
      return i18n.t('error.cannotStakeMoreThanYouHave')
    }
  }
  error = error || invalidAmount()

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between items-center">
        <h1 className="header-text">{i18n.t('Manage staking')}</h1>
      </div>

      <div className="flex gap-1 py-[20px] mb-2 border-b border-inactive">
        <ModeButton
          active={mode === StakingMode.Stake}
          onClick={() => setMode(StakingMode.Stake)}
        >
          {i18n.t('Stake')}
        </ModeButton>
        <ModeButton
          active={mode === StakingMode.Unstake}
          onClick={() => setMode(StakingMode.Unstake)}
        >
          {i18n.t('Unstake')}
        </ModeButton>
        {canClaim && (
          <ModeButton
            active={mode === StakingMode.Claim}
            onClick={() => setMode(StakingMode.Claim)}
          >
            {i18n.t('Claim')}
          </ModeButton>
        )}
      </div>
      {mode === StakingMode.Stake && (
        <StakeUnstakeModesBody
          amount={amount}
          max={stakableTokens}
          mode={mode}
          setAmount={(amount: number) => setAmount(amount)}
          tokenDecimals={tokenDecimals}
          unstakingDuration={unstakingDuration}
        />
      )}
      {mode === StakingMode.Unstake && (
        <StakeUnstakeModesBody
          amount={amount}
          max={unstakableTokens}
          mode={mode}
          setAmount={(amount: number) => setAmount(amount)}
          tokenDecimals={tokenDecimals}
          unstakingDuration={unstakingDuration}
        />
      )}
      {mode === StakingMode.Claim && (
        <ClaimModeBody
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
    </Modal>
  )
}

interface StakeUnstakeModesBodyProps {
  amount: number
  mode: StakingMode
  max: number
  setAmount: (newAmount: number) => void
  tokenDecimals: number
  unstakingDuration: Duration | null
}

const StakeUnstakeModesBody: FC<StakeUnstakeModesBodyProps> = ({
  amount,
  setAmount,
  mode,
  max,
  tokenDecimals,
  unstakingDuration,
}) => (
  <>
    <div className="flex flex-col mt-5">
      <h2 className="mb-3 primary-text">{i18n.t('Choose token amount')}</h2>
      <AmountSelector amount={amount} max={max} setAmount={setAmount} />
      {amount > max && (
        <span className="mt-1 ml-1 text-error caption-text">
          {i18n.t('error.cannotStakeMoreThanYouHave')}
        </span>
      )}
      <span className="mt-4 font-mono caption-text">
        {i18n.t('Your balance') + ': '}
        {max.toLocaleString(undefined, {
          maximumFractionDigits: tokenDecimals,
        })}
      </span>
      <div className="mt-4">
        <PercentSelector
          amount={amount}
          max={max}
          setAmount={setAmount}
          tokenDecimals={tokenDecimals}
        />
      </div>
    </div>

    {unstakingDuration && durationIsNonZero(unstakingDuration) && (
      <>
        <hr className="mt-3" />
        <UnstakingDurationDisplay
          mode={mode}
          unstakingDuration={unstakingDuration}
        />
      </>
    )}
  </>
)

interface ClaimModeBodyProps {
  amount: number
  tokenDecimals: number
  tokenSymbol: string
}

const ClaimModeBody: FC<ClaimModeBodyProps> = ({
  amount,
  tokenSymbol,
  tokenDecimals,
}) => (
  <div className="flex flex-col py-3 px-6 mt-3">
    <h2 className="font-medium">
      {convertMicroDenomToDenomWithDecimals(
        amount,
        tokenDecimals
      ).toLocaleString(undefined, {
        maximumFractionDigits: tokenDecimals,
      })}{' '}
      ${tokenSymbol} available
    </h2>
    <p className="mt-3 mb-3 text-sm">
      Claim them to receive your unstaked tokens.
    </p>
  </div>
)

interface UnstakingDurationDisplayProps {
  unstakingDuration: Duration
  mode: StakingMode
}

const UnstakingDurationDisplay: FC<UnstakingDurationDisplayProps> = ({
  unstakingDuration,
  mode,
}) => (
  <div className="mt-3 secondary-text">
    <h2 className="link-text">
      {mode == StakingMode.Unstake
        ? i18n.t('You are about to unstake')
        : i18n.t('Unstaking period') +
          `: ${humanReadableDuration(unstakingDuration)}`}
    </h2>
    <p className="mt-3">
      {i18n.t('Unstaking mechanics', {
        humanReadableTime: humanReadableDuration(unstakingDuration),
      })}
    </p>
  </div>
)
