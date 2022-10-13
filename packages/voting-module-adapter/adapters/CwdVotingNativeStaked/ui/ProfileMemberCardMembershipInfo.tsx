import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/tstypes'
import { Button, TokenAmountDisplay, UnstakingModal } from '@dao-dao/ui'
import { formatPercentOf100, secondsToWdhms } from '@dao-dao/utils'

export interface ProfileMemberCardMembershipInfoProps {
  claimingLoading: boolean
  stakingLoading: boolean
  votingPower: number
  tokenSymbol: string
  stakedTokens: number
  tokenDecimals: number
  unstakingTasks: UnstakingTask[]
  unstakedTokens: number
  unstakingDurationSeconds: number | undefined
  onClaim: () => void
  onStake: () => void
  refreshUnstakingTasks: () => void
}

export const ProfileMemberCardMembershipInfo = ({
  claimingLoading,
  stakingLoading,
  votingPower,
  tokenSymbol,
  stakedTokens,
  tokenDecimals,
  unstakingTasks,
  unstakedTokens,
  unstakingDurationSeconds,
  onClaim,
  onStake,
  refreshUnstakingTasks,
}: ProfileMemberCardMembershipInfoProps) => {
  const { t } = useTranslation()

  const claimableBalance = useMemo(
    () =>
      unstakingTasks.reduce(
        (acc, task) =>
          acc +
          // Only include balance of ready to claim tasks.
          (task.status === UnstakingTaskStatus.ReadyToClaim ? task.amount : 0),
        0
      ) ?? 0,
    [unstakingTasks]
  )
  const unstakingBalance = useMemo(
    () =>
      unstakingTasks.reduce(
        (acc, task) =>
          acc +
          // Only include balance of unstaking tasks.
          (task.status === UnstakingTaskStatus.Unstaking ? task.amount : 0),
        0
      ) ?? 0,
    [unstakingTasks]
  )

  const [showUnstakingTokens, setShowUnstakingTokens] = useState(false)

  return (
    <>
      <div className="secondary-text flex flex-row items-center justify-between pb-3">
        <p>{t('title.stakedTokens')}</p>

        <TokenAmountDisplay
          amount={stakedTokens}
          className="text-text-primary text-right font-mono"
          maxDecimals={tokenDecimals}
          symbol={tokenSymbol}
        />
      </div>

      <div className="secondary-text flex flex-row items-center justify-between pb-3">
        <p>{t('title.votingPower')}</p>
        <p className="text-text-primary text-right font-mono">
          {formatPercentOf100(votingPower)}
        </p>
      </div>

      <div className="secondary-text flex flex-row items-center justify-between pb-3">
        <p>{t('title.unstakingTokens')}</p>

        <Button
          className={clsx(
            'text-right font-mono underline-offset-2',
            unstakingBalance > 0 && 'text-text-primary'
          )}
          onClick={() => setShowUnstakingTokens(true)}
          variant="underline"
        >
          {t('format.token', {
            amount: unstakingBalance.toLocaleString(undefined, {
              notation: 'compact',
              maximumFractionDigits: tokenDecimals,
            }),
            symbol: tokenSymbol,
          })}
        </Button>
      </div>

      <div className="secondary-text flex flex-row items-center justify-between pb-6">
        <p>{t('title.availableTokens')}</p>

        <TokenAmountDisplay
          amount={unstakedTokens}
          className={clsx('text-right font-mono', {
            'text-text-tertiary': unstakedTokens === 0,
            'text-icon-interactive-valid': unstakedTokens > 0,
          })}
          maxDecimals={tokenDecimals}
          symbol={tokenSymbol}
        />
      </div>

      {claimableBalance > 0 && (
        <Button
          className="mb-2 w-full"
          contentContainerClassName="justify-center"
          disabled={stakingLoading}
          loading={claimingLoading}
          onClick={onClaim}
          size="lg"
          variant="primary"
        >
          {t('button.claimNumTokens', {
            amount: claimableBalance.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            }),
            tokenSymbol,
          })}
        </Button>
      )}

      <Button
        className="w-full"
        contentContainerClassName="justify-center"
        disabled={claimingLoading}
        loading={stakingLoading}
        onClick={onStake}
        size="lg"
        variant="secondary"
      >
        {t('button.manageStake', { tokenSymbol })}
      </Button>

      <UnstakingModal
        onClaim={onClaim}
        onClose={() => setShowUnstakingTokens(false)}
        refresh={refreshUnstakingTasks}
        tasks={unstakingTasks}
        unstakingDuration={
          unstakingDurationSeconds
            ? secondsToWdhms(unstakingDurationSeconds)
            : undefined
        }
        visible={showUnstakingTokens}
      />
    </>
  )
}
