import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Duration } from '@dao-dao/tstypes/contracts/common'
import {
  StakingModalProps,
  StakingMode,
} from '@dao-dao/tstypes/ui/StakingModal'
import {
  convertMicroDenomToDenomWithDecimals,
  durationIsNonZero,
  humanReadableDuration,
} from '@dao-dao/utils'

import { Button } from '../Button'
import { NumberInput } from '../input/NumberInput'
import { Modal } from '../Modal'
import { SegmentedControls } from '../SegmentedControls'
import { Tooltip } from '../Tooltip'
import { PercentButton } from './PercentButton'

export * from '@dao-dao/tstypes/ui/StakingModal'

export const StakingModal = ({
  initialMode,
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
}: StakingModalProps) => {
  const { t } = useTranslation()

  const [mode, setMode] = useState(initialMode)
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
    <Modal
      header={{
        title:
          mode === StakingMode.Claim
            ? t('title.claimTokens')
            : t('title.manageStaking'),
      }}
      headerContent={
        mode === StakingMode.Claim ? undefined : (
          <SegmentedControls
            className="mt-5 w-max"
            onSelect={setMode}
            selected={mode}
            tabs={[
              {
                label: t(`button.stakingMode.stake`),
                value: StakingMode.Stake,
              },
              {
                label: t(`button.stakingMode.unstake`),
                value: StakingMode.Unstake,
              },
            ]}
          />
        )
      }
      onClose={onClose}
      visible
    >
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
        <Tooltip title={error || invalidAmount()}>
          <Button
            disabled={!!error}
            loading={loading}
            onClick={() =>
              onAction(
                mode,
                mode === StakingMode.Claim ? claimableTokens : amount
              )
            }
            size="lg"
          >
            {t(`button.stakingMode.${mode}`)}
          </Button>
        </Tooltip>
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

const StakeUnstakeModesBody = ({
  amount,
  setAmount,
  mode,
  max,
  tokenSymbol,
  tokenDecimals,
  unstakingDuration,
  proposalDeposit,
}: StakeUnstakeModesBodyProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col">
        <h2 className="mb-6 primary-text">{t('title.chooseTokenAmount')}</h2>
        <NumberInput
          containerClassName="py-7 w-full h-20 pl-6 pr-8 bg-background-secondary rounded-md gap-4"
          ghost
          iconContainerClassName="gap-1"
          iconSize="default"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.valueAsNumber)
          }
          onMinus={() => setAmount(Math.max(Math.min(amount - 1, max), 0))}
          onPlus={() => setAmount(Math.max(Math.min(amount + 1, max), 0))}
          textClassName="font-mono leading-5 symbol-small-body-text"
          unit={`$${tokenSymbol}`}
          value={amount}
        />
        {amount > max && (
          <span className="mt-1 ml-1 text-error caption-text">
            {t('error.cannotStakeMoreThanYouHave')}
          </span>
        )}
        <span className="mt-4 font-mono caption-text">
          {t('info.yourBalance') + ': '}
          {max.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '}
          ${tokenSymbol}
        </span>
        <div className="mt-6">
          <div className="grid grid-cols-5 gap-2">
            {[10, 25, 50, 75, 100].map((percent) => (
              <PercentButton
                key={percent}
                amount={amount}
                label={`${percent}%`}
                max={max}
                percent={percent / 100}
                setAmount={setAmount}
                tokenDecimals={tokenDecimals}
              />
            ))}
          </div>
          {mode === StakingMode.Stake &&
            !!proposalDeposit &&
            max > proposalDeposit && (
              <PercentButton
                absoluteOffset={-proposalDeposit}
                amount={amount}
                className="mt-2"
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

      {(mode === StakingMode.Stake || mode === StakingMode.Unstake) &&
        unstakingDuration &&
        durationIsNonZero(unstakingDuration) && (
          <div className="px-6 pt-7 -mx-6 mt-7 space-y-5 border-t border-border-secondary">
            <p className="text-text-secondary primary-text">
              {t('title.unstakingPeriod') +
                `: ${humanReadableDuration(unstakingDuration)}`}
            </p>
            <p className="text-text-secondary body-text">
              {t('info.unstakingMechanics', {
                humanReadableTime: humanReadableDuration(unstakingDuration),
              })}
            </p>
          </div>
        )}
    </>
  )
}

interface ClaimModeBodyProps {
  amount: number
  tokenDecimals: number
  tokenSymbol: string
}

const ClaimModeBody = ({
  amount,
  tokenSymbol,
  tokenDecimals,
}: ClaimModeBodyProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
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
