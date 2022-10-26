import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ButtonLink,
  TokenAmountDisplay,
  UnstakingModal,
} from '@dao-dao/stateless'
import {
  BaseProfileCardMemberInfoProps,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import { formatPercentOf100, secondsToWdhms } from '@dao-dao/utils'

export interface ProfileCardMemberInfoTokensProps
  extends Omit<BaseProfileCardMemberInfoProps, 'deposit'> {
  daoName: string
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
  junoswapHref?: string
}

export const ProfileCardMemberInfoTokens = ({
  daoName,
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
  junoswapHref,
  cantVoteOnProposal,
}: ProfileCardMemberInfoTokensProps) => {
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

  const isMember = stakedTokens > 0
  const canBeMemberButIsnt = !isMember && unstakedTokens > 0

  return (
    <>
      <div className="secondary-text space-y-3">
        {
          // If cannot vote on proposal, this means they did not have voting power at the time of proposal creation. Show proposal-specific message when in a proposal.
          cantVoteOnProposal ? (
            <p>
              {t('info.tokenDaoNotMemberInfoProposal', {
                tokenSymbol,
                daoName,
              })}
            </p>
          ) : // Only show join instructions if not proposal-specific message above.
          !isMember ? (
            <p>
              {t('info.stakeYourTokensToJoin', { tokenSymbol, daoName })}{' '}
              {junoswapHref && (
                <ButtonLink
                  className="font-normal text-inherit"
                  href={junoswapHref}
                  variant="underline"
                >
                  {t('info.getTokensOn', { name: 'Junoswap' })}
                </ButtonLink>
              )}
            </p>
          ) : null
        }

        <div className="flex flex-row items-start justify-between">
          <p>{t('title.balances')}</p>
          <div
            className={clsx(
              'flex items-end gap-1',
              // If can't vote on proposal or has staked tokens, show staked
              // tokens first since it is most relevant. Otherwise, show
              // unstaked tokens first.
              cantVoteOnProposal || stakedTokens > 0
                ? 'flex-col'
                : 'flex-col-reverse'
            )}
          >
            <TokenAmountDisplay
              amount={stakedTokens}
              className={clsx('text-right font-mono', {
                'text-text-tertiary': stakedTokens === 0,
              })}
              decimals={tokenDecimals}
              suffix={` ${t('info.staked')}`}
              symbol={tokenSymbol}
            />

            <TokenAmountDisplay
              amount={unstakedTokens}
              className={clsx('text-right font-mono', {
                'text-text-tertiary': unstakedTokens === 0,
                'text-icon-interactive-valid': unstakedTokens > 0,
              })}
              decimals={tokenDecimals}
              symbol={tokenSymbol}
            />
          </div>
        </div>

        {/* Only show voting power if non-zero. */}
        {votingPower > 0 && (
          <div className="flex flex-row items-center justify-between">
            <p>{t('title.votingPower')}</p>
            <p className="text-right font-mono text-text-primary">
              {formatPercentOf100(votingPower)}
            </p>
          </div>
        )}

        {/* Show unstaking balance if any are unstaking or claimable or if they are a member. */}
        {(isMember || unstakingBalance > 0 || claimableBalance > 0) && (
          <div className="flex flex-row items-center justify-between">
            <p>{t('title.unstakingTokens')}</p>

            <Button
              className={clsx(
                'text-right font-mono underline-offset-2',
                unstakingBalance === 0 && 'text-text-tertiary'
              )}
              onClick={() => setShowUnstakingTokens(true)}
              variant={unstakingBalance > 0 ? 'underline' : 'none'}
            >
              <TokenAmountDisplay
                amount={unstakingBalance}
                decimals={tokenDecimals}
                symbol={tokenSymbol}
              />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {claimableBalance > 0 && (
          <Button
            contentContainerClassName="justify-center"
            disabled={stakingLoading}
            loading={claimingLoading}
            onClick={onClaim}
            size="lg"
            variant={
              // If stake button below is primary, don't make this primary.
              canBeMemberButIsnt ? 'secondary' : 'primary'
            }
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
          contentContainerClassName="justify-center"
          disabled={claimingLoading || (!isMember && unstakedTokens === 0)}
          loading={stakingLoading}
          onClick={onStake}
          size="lg"
          variant={canBeMemberButIsnt ? 'primary' : 'secondary'}
        >
          {stakedTokens === 0
            ? t('button.stakeTokenSymbol', { tokenSymbol })
            : t('button.manageStake', { tokenSymbol })}
        </Button>
      </div>

      <UnstakingModal
        onClaim={onClaim}
        onClose={() => setShowUnstakingTokens(false)}
        refresh={refreshUnstakingTasks}
        tasks={unstakingTasks}
        unstakingDuration={
          unstakingDurationSeconds
            ? secondsToWdhms(unstakingDurationSeconds, 2, false)
            : undefined
        }
        visible={showUnstakingTokens}
      />
    </>
  )
}
