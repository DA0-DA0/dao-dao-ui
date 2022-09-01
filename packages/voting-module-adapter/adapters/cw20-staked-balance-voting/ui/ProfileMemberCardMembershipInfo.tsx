import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  UnstakingModal,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

export interface ProfileMemberCardMembershipInfoProps {
  loadingClaiming: boolean
  loadingManaging: boolean
  votingPower: number
  tokenSymbol: string
  stakedTokens: number
  tokenDecimals: number
  unstakingTasks: UnstakingTask[]
  unstakedTokens: number
  unstakingDuration: string
  onClaim: () => void
}

export const ProfileMemberCardMembershipInfo = ({
  loadingClaiming,
  loadingManaging,
  votingPower,
  tokenSymbol,
  stakedTokens,
  tokenDecimals,
  unstakingTasks,
  unstakedTokens,
  unstakingDuration,
  onClaim,
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

  const [showManageStake, setShowManageStake] = useState(false)
  const [showUnstakingTokens, setShowUnstakingTokens] = useState(false)

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-3 secondary-text">
        <p>{t('title.stakedTokens')}</p>
        <p className="font-mono text-text-primary">
          {stakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '}
          ${tokenSymbol}
        </p>
      </div>

      <div className="flex flex-row justify-between items-center pb-3 secondary-text">
        <p>{t('title.votingPower')}</p>
        <p className="font-mono text-text-primary">
          {formatPercentOf100(votingPower)}
        </p>
      </div>

      <div className="flex flex-row justify-between items-center pb-3 secondary-text">
        <p>{t('title.unstakingTokens')}</p>

        <Button
          className={clsx(
            'font-mono text-right underline-offset-2',
            unstakingBalance > 0 && 'text-text-primary'
          )}
          onClick={() => setShowUnstakingTokens(true)}
          variant="underline"
        >
          {unstakingBalance.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '}
          ${tokenSymbol}
        </Button>
      </div>

      <div className="flex flex-row justify-between items-center pb-6 secondary-text">
        <p>{t('title.availableTokens')}</p>
        <p
          className={clsx('font-mono', {
            'text-text-tertiary': unstakedTokens === 0,
            'text-icon-interactive-valid': unstakedTokens > 0,
          })}
        >
          {unstakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '}
          ${tokenSymbol}
        </p>
      </div>

      {claimableBalance > 0 && (
        <Button
          className="mb-2 w-full"
          contentContainerClassName="justify-center"
          disabled={loadingManaging}
          loading={loadingClaiming}
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
        disabled={loadingClaiming}
        loading={loadingManaging}
        onClick={() => setShowManageStake(true)}
        size="lg"
        variant="secondary"
      >
        {t('button.manageStake', { tokenSymbol })}
      </Button>

      {/* {showManageStake && (
        <StakingModal {...} />
      )} */}

      {showUnstakingTokens && (
        <UnstakingModal
          onClaim={onClaim}
          onClose={() => setShowUnstakingTokens(false)}
          tasks={unstakingTasks}
          unstakingDuration={unstakingDuration}
        />
      )}
    </>
  )
}
