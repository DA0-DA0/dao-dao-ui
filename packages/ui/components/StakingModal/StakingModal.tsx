import { FC, useCallback } from 'react'

import { useTranslation } from '@dao-dao/i18n'
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

export const useStakingModeTitle = () => {
  const { t } = useTranslation()

  return useCallback(
    (mode: StakingMode) => {
      switch (mode) {
        case StakingMode.Stake:
          return t('title.stakeTokens')
        case StakingMode.Unstake:
          return t('title.unstakeTokens')
        case StakingMode.Claim:
          return t('title.claimTokens')
        default:
          return 'internal error'
      }
    },
    [t]
  )
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
  const stakingModeTitle = useStakingModeTitle()
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
      <div className="flex items-center justify-between">
        <h1 className="header-text">{stakingModeTitle(mode)}</h1>
      </div>

      {mode === StakingMode.Stake && (
        <StakeUnstakeModesBody
          amount={amount}
          max={stakableTokens}
          mode={mode}
          proposalDeposit={proposalDeposit}
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
      <div className="mt-5 flex flex-col">
        <h2 className="primary-text mb-3">{t('title.chooseTokenAmount')}</h2>
        <AmountSelector amount={amount} max={max} setAmount={setAmount} />
        {amount > max && (
          <span className="caption-text mt-1 ml-1 text-error">
            {t('error.cannotStakeMoreThanYouHave')}
          </span>
        )}
        <span className="caption-text mt-4 font-mono">
          {t('info.yourBalance') + ': '}
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
              label={t('button.stakeAllButProposalDeposit', {
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
    <div className="mt-3 flex flex-col py-3">
      <h2 className="font-medium">
        {convertMicroDenomToDenomWithDecimals(
          amount,
          tokenDecimals
        ).toLocaleString(undefined, {
          maximumFractionDigits: tokenDecimals,
        })}{' '}
        ${tokenSymbol} {t('info.available')}
      </h2>
      <p className="mt-3 mb-3 text-sm">{t('info.claimToReceiveUnstaked')}</p>
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
}) => {
  const { t } = useTranslation()

  return (
    <div className="secondary-text mt-3">
      <h2 className="link-text">
        {mode === StakingMode.Unstake
          ? t('info.aboutToUnstake')
          : t('title.unstakingPeriod') +
            `: ${humanReadableDuration(unstakingDuration)}`}
      </h2>
      <p className="mt-3">
        {t('info.unstakingMechanics', {
          humanReadableTime: humanReadableDuration(unstakingDuration),
        })}
      </p>
    </div>
  )
}
