import clsx from 'clsx'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'
import {
  StakingModalProps,
  StakingMode,
} from '@dao-dao/types/components/StakingModal'
import { Duration } from '@dao-dao/types/contracts/common'
import {
  convertMicroDenomToDenomWithDecimals,
  durationIsNonZero,
  humanReadableDuration,
} from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import { NumberInput, SegmentedControls } from '../inputs'
import { Modal } from '../modals/Modal'
import { Tooltip } from '../Tooltip'
import { PercentButton } from './PercentButton'

export * from '@dao-dao/types/components/StakingModal'

export const StakingModal = ({
  initialMode,
  amount,
  setAmount,
  onClose,
  // microdenom
  claimableTokens,
  // macrodenom
  loadingStakableTokens,
  // macrodenom
  loadingUnstakableTokens,
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
  const maxTx =
    mode === StakingMode.Stake
      ? loadingStakableTokens.loading
        ? undefined
        : loadingStakableTokens.data
      : loadingUnstakableTokens.loading
      ? undefined
      : loadingUnstakableTokens.data

  const invalidAmount = (): string | undefined => {
    if (mode === StakingMode.Claim) {
      return claimableTokens > 0 ? undefined : t('error.cannotTxZeroTokens')
    }
    if (amount <= 0) {
      return t('error.cannotTxZeroTokens')
    }
    if (maxTx === undefined) {
      return t('error.loadingData')
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
          loadingMax={loadingStakableTokens}
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
          loadingMax={loadingUnstakableTokens}
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
  loadingMax: LoadingData<number>
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
  loadingMax,
  tokenSymbol,
  tokenDecimals,
  unstakingDuration,
  proposalDeposit,
}: StakeUnstakeModesBodyProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col">
        <h2 className="primary-text mb-6">{t('title.chooseTokenAmount')}</h2>
        <NumberInput
          containerClassName="py-7 w-full h-20 pl-6 pr-8 bg-background-secondary rounded-md gap-4"
          ghost
          iconContainerClassName="gap-1"
          iconSize="default"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.valueAsNumber)
          }
          onMinus={
            loadingMax.loading
              ? // Use empty function so button still appears.
                () => {}
              : () =>
                  setAmount(Math.max(Math.min(amount - 1, loadingMax.data), 0))
          }
          onPlus={
            loadingMax.loading
              ? // Use empty function so button still appears.
                () => {}
              : () =>
                  setAmount(Math.max(Math.min(amount + 1, loadingMax.data), 0))
          }
          textClassName="font-mono leading-5 symbol-small-body-text"
          unit={`$${tokenSymbol}`}
          value={amount}
        />
        {!loadingMax.loading && amount > loadingMax.data && (
          <span className="caption-text mt-1 ml-1 text-text-interactive-error">
            {t('error.cannotStakeMoreThanYouHave')}
          </span>
        )}
        <p className="caption-text mt-4 font-mono">
          {t('info.yourBalance')}
          {': '}
          <span className={clsx(loadingMax.loading && 'animate-pulse')}>
            {loadingMax.loading
              ? `... $${tokenSymbol}`
              : t('format.token', {
                  amount: loadingMax.data.toLocaleString(undefined, {
                    maximumFractionDigits: tokenDecimals,
                  }),
                  symbol: tokenSymbol,
                })}
          </span>
        </p>
        <div className="mt-6">
          <div className="grid grid-cols-5 gap-2">
            {[10, 25, 50, 75, 100].map((percent) => (
              <PercentButton
                key={percent}
                amount={amount}
                label={`${percent}%`}
                loadingMax={loadingMax}
                percent={percent / 100}
                setAmount={setAmount}
                tokenDecimals={tokenDecimals}
              />
            ))}
          </div>
          {mode === StakingMode.Stake &&
            !!proposalDeposit &&
            !loadingMax.loading &&
            loadingMax.data > proposalDeposit && (
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
                loadingMax={loadingMax}
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
          <div className="-mx-6 mt-7 space-y-5 border-t border-border-secondary px-6 pt-7">
            <p className="primary-text text-text-secondary">
              {t('title.unstakingPeriod') +
                `: ${humanReadableDuration(unstakingDuration)}`}
            </p>
            <p className="body-text text-text-secondary">
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
        {t('format.token', {
          amount: convertMicroDenomToDenomWithDecimals(
            amount,
            tokenDecimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          }),
          symbol: tokenSymbol,
        })}{' '}
        {t('info.available')}
      </h2>
      <p className="mt-3 mb-3 text-sm">{t('info.claimToReceiveUnstaked')}</p>
    </div>
  )
}
