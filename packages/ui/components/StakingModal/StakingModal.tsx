import { FC } from 'react'

import { t, useTranslation } from '@dao-dao/i18n'
import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import {
  convertMicroDenomToDenomWithDecimals,
  durationIsNonZero,
  humanReadableDuration,
} from '@dao-dao/utils'

import { Modal } from '../Modal'
import { ActionButton } from './ActionButton'
import { AmountSelector } from './AmountSelector'
import { PercentButton, PercentSelector } from './PercentSelector'

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

export const stakingModeTitle = (mode: StakingMode) => {
  switch (mode) {
    case StakingMode.Stake:
      return t('Stake Tokens')
    case StakingMode.Unstake:
      return t('Unstake Tokens')
    case StakingMode.Claim:
      return t('Claim Tokens')
    default:
      return 'internal error'
  }
}

export interface StakingModalProps {
  // The mode to open the staking modal in.
  mode: StakingMode
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
  // Proposal deposit for the token that is being staked.
  proposalDeposit?: number
  // Is there an error?
  error?: string | undefined
  // Are we ready to stake? Ex: is wallet connected?
  loading: boolean
  // Triggered when the stake / unstake / claim button is pressed.
  onAction: (mode: StakingMode, amount: number) => void
}

export const StakingModal: FC<StakingModalProps> = ({
  mode,
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
  // macrodenom
  proposalDeposit,
  loading,
  error,
  onAction,
}) => {
  const { t } = useTranslation()
  const maxTx = mode === StakingMode.Stake ? stakableTokens : unstakableTokens

  const invalidAmount = (): string | undefined => {
    if (mode === StakingMode.Claim) {
      return claimableTokens > 0 ? undefined : t('error.cannotTxZeroTokens')
    }
    if (amount <= 0) {
      return t('error.cannotTxZeroTokens')
    }
    if (amount > maxTx) {
      return t('error.cannotStakeMoreThanYouHave')
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between items-center">
        <h1 className="header-text">{stakingModeTitle(mode)}</h1>
      </div>

      {mode === StakingMode.Stake && (
        <StakeUnstakeModesBody
          amount={amount}
          max={stakableTokens}
          mode={mode}
          proposalDeposit={proposalDeposit || 5}
          setAmount={(amount: number) => setAmount(amount)}
          tokenDecimals={tokenDecimals}
          tokenSymbol={tokenSymbol}
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
          tokenSymbol={tokenSymbol}
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
      <div className="flex justify-end pt-6">
        <ActionButton
          error={error || invalidAmount()}
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
  tokenSymbol: string
  tokenDecimals: number
  unstakingDuration: Duration | null
  proposalDeposit?: number
}

const StakeUnstakeModesBody: FC<StakeUnstakeModesBodyProps> = ({
  amount,
  setAmount,
  mode,
  max,
  tokenSymbol,
  tokenDecimals,
  unstakingDuration,
  proposalDeposit,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col mt-5">
        <h2 className="mb-3 primary-text">{t('Choose token amount')}</h2>
        <AmountSelector amount={amount} max={max} setAmount={setAmount} />
        {amount > max && (
          <span className="mt-1 ml-1 text-error caption-text">
            {t('error.cannotStakeMoreThanYouHave')}
          </span>
        )}
        <span className="mt-4 font-mono caption-text">
          {t('Your balance') + ': '}
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
          {!!proposalDeposit && max > proposalDeposit && (
            <PercentButton
              absoluteOffset={-proposalDeposit}
              amount={amount}
              className="mt-1"
              label={t('Stake all but proposal deposit', {
                proposalDeposit: proposalDeposit.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                }),
                tokenSymbol,
              })}
              max={max}
              percent={1}
              setAmount={setAmount}
              tokenDecimals={tokenDecimals}
            />
          )}
        </div>
      </div>

      {mode === StakingMode.Unstake &&
        unstakingDuration &&
        durationIsNonZero(unstakingDuration) && (
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
}

interface ClaimModeBodyProps {
  amount: number
  tokenDecimals: number
  tokenSymbol: string
}

const ClaimModeBody: FC<ClaimModeBodyProps> = ({
  amount,
  tokenSymbol,
  tokenDecimals,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col py-3 mt-3">
      <h2 className="font-medium">
        {convertMicroDenomToDenomWithDecimals(
          amount,
          tokenDecimals
        ).toLocaleString(undefined, {
          maximumFractionDigits: tokenDecimals,
        })}{' '}
        ${tokenSymbol} {t('available')}
      </h2>
      <p className="mt-3 mb-3 text-sm">{t('claimToReceiveUnstaked')}</p>
    </div>
  )
}

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
        ? t('You are about to unstake')
        : t('Unstaking period') +
          `: ${humanReadableDuration(unstakingDuration)}`}
    </h2>
    <p className="mt-3">
      {t('Unstaking mechanics', {
        humanReadableTime: humanReadableDuration(unstakingDuration),
      })}
    </p>
  </div>
)
