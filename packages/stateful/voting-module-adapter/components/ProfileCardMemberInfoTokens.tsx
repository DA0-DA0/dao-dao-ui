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
  LoadingData,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import { formatPercentOf100, secondsToWdhms } from '@dao-dao/utils'

export interface ProfileCardMemberInfoTokensProps
  extends Omit<BaseProfileCardMemberInfoProps, 'deposit'> {
  daoName: string
  claimingLoading: boolean
  stakingLoading: boolean
  tokenSymbol: string
  tokenDecimals: number
  unstakingTasks: UnstakingTask[]
  unstakingDurationSeconds: number | undefined
  onClaim: () => void
  onStake: () => void
  refreshUnstakingTasks: () => void
  junoswapHref?: string
  loadingVotingPower: LoadingData<number>
  loadingStakedTokens: LoadingData<number>
  loadingUnstakedTokens: LoadingData<number>
}

export const ProfileCardMemberInfoTokens = ({
  daoName,
  claimingLoading,
  stakingLoading,
  tokenSymbol,
  tokenDecimals,
  unstakingTasks,
  unstakingDurationSeconds,
  onClaim,
  onStake,
  refreshUnstakingTasks,
  junoswapHref,
  cantVoteOnProposal,
  loadingVotingPower,
  loadingStakedTokens,
  loadingUnstakedTokens,
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

  const isMember = !loadingStakedTokens.loading && loadingStakedTokens.data > 0
  const canBeMemberButIsnt =
    !loadingUnstakedTokens.loading &&
    !isMember &&
    loadingUnstakedTokens.data > 0

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
              cantVoteOnProposal ||
                (!loadingStakedTokens.loading && loadingStakedTokens.data > 0)
                ? 'flex-col'
                : 'flex-col-reverse'
            )}
          >
            <TokenAmountDisplay
              amount={loadingStakedTokens}
              className={clsx('text-right font-mono', {
                'text-text-tertiary':
                  loadingStakedTokens.loading || loadingStakedTokens.data === 0,
              })}
              decimals={tokenDecimals}
              suffix={` ${t('info.staked')}`}
              symbol={tokenSymbol}
            />

            <TokenAmountDisplay
              amount={loadingUnstakedTokens}
              className={clsx(
                'text-right font-mono',
                loadingUnstakedTokens.loading ||
                  loadingUnstakedTokens.data === 0
                  ? 'text-text-tertiary'
                  : 'text-icon-interactive-valid'
              )}
              decimals={tokenDecimals}
              symbol={tokenSymbol}
            />
          </div>
        </div>

        {/* Only show voting power if loading or non-zero. */}
        {(loadingVotingPower.loading || loadingVotingPower.data > 0) && (
          <div className="flex flex-row items-center justify-between">
            <p>{t('title.votingPower')}</p>
            <p
              className={clsx(
                'text-right font-mono',
                loadingVotingPower.loading
                  ? 'animate-pulse text-text-tertiary'
                  : 'text-text-primary'
              )}
            >
              {loadingVotingPower.loading
                ? '...'
                : formatPercentOf100(loadingVotingPower.data)}
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
          disabled={
            claimingLoading ||
            (!isMember &&
              (loadingUnstakedTokens.loading ||
                loadingUnstakedTokens.data === 0))
          }
          loading={stakingLoading}
          onClick={onStake}
          size="lg"
          variant={canBeMemberButIsnt ? 'primary' : 'secondary'}
        >
          {!loadingStakedTokens.loading && loadingStakedTokens.data === 0
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
            ? secondsToWdhms(unstakingDurationSeconds)
            : undefined
        }
        visible={showUnstakingTokens}
      />
    </>
  )
}
