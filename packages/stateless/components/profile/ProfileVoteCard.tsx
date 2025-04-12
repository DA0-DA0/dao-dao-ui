import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileCardWrapperProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { TooltipInfoIcon } from '../tooltip/TooltipInfoIcon'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileVoteCardProps
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  /**
   * The voting power of the vote as a percentage of the total voting power.
   * Includes all voting power (both individual and delegated).
   */
  votingPower: number
  /**
   * The voting power of the vote delegated to the voter by other members of the
   * DAO who have not yet voted on the proposal as a percentage of the total
   * voting power.
   *
   * Since delegations were added in v2.7.0, this is 0 for earlier versions.
   */
  unvotedDelegatedVotingPower: number
  /**
   * Whether or not the wallet is registered as a delegate.
   */
  isDelegate: boolean
  /**
   * Whether or not voting is still open.
   */
  isVotingOpen: boolean
  daoName: string
  vote: ReactNode
}

export const ProfileVoteCard = ({
  votingPower,
  unvotedDelegatedVotingPower,
  isDelegate,
  isVotingOpen,
  daoName,
  vote,
  ...wrapperProps
}: ProfileVoteCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      compact
      underHeaderComponent={<MembershipPill daoName={daoName} ghost isMember />}
      {...wrapperProps}
    >
      <div className="secondary-text flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <p>{t('title.votingPower')}</p>

          <TooltipInfoIcon
            className="text-icon-secondary"
            size="sm"
            title={t('info.votingPowerAtCreationTooltip', {
              context: isDelegate ? 'withDelegated' : undefined,
            })}
          />
        </div>

        <p className="font-mono text-text-brand-secondary">
          {formatPercentOf100(votingPower)}
        </p>
      </div>

      {isDelegate && (
        <div className="secondary-text flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <p
              className={
                unvotedDelegatedVotingPower > 0
                  ? 'text-text-secondary'
                  : 'text-text-tertiary'
              }
            >
              {t('title.delegatedVotingPower')}
            </p>

            <TooltipInfoIcon
              className={
                unvotedDelegatedVotingPower > 0
                  ? 'text-icon-secondary'
                  : 'text-icon-tertiary'
              }
              size="sm"
              title={t('info.unvotedDelegatedVotingPowerAtCreationTooltip', {
                context: isVotingOpen ? 'votingOpen' : 'votingClosed',
              })}
            />
          </div>

          <p
            className={clsx(
              'font-mono',
              unvotedDelegatedVotingPower > 0
                ? 'text-text-brand-secondary'
                : 'text-text-tertiary'
            )}
          >
            {formatPercentOf100(unvotedDelegatedVotingPower)}
          </p>
        </div>
      )}

      <div className="secondary-text mt-2 flex flex-row items-center justify-between">
        <p>{t('title.vote')}</p>
        {vote}
      </div>
    </ProfileCardWrapper>
  )
}
