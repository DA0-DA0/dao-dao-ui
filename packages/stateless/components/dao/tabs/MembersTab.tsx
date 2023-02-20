import { Add } from '@mui/icons-material'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from 'chart.js'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import {
  StatefulDaoMemberCardProps,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useNamedThemeColor } from '../../../theme'
import { ButtonLinkProps } from '../../buttons'
import { GridCardContainer } from '../../GridCardContainer'
import { TooltipInfoIcon } from '../../tooltip/TooltipInfoIcon'
import { VOTING_POWER_DISTRIBUTION_COLORS } from '../create'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale)

export interface MembersTabProps {
  DaoMemberCard: ComponentType<StatefulDaoMemberCardProps>
  members: StatefulDaoMemberCardProps[]
  isMember: boolean
  addMemberHref?: string
  ButtonLink: ComponentType<ButtonLinkProps>
  // If defined, will show the top voter distribution.
  topVoters?: {
    title: string
    otherTitle: string
    EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  }
}

export const MembersTab = ({
  DaoMemberCard,
  members,
  isMember,
  addMemberHref,
  ButtonLink,
  topVoters,
}: MembersTabProps) => {
  const { t } = useTranslation()
  const otherColor = useNamedThemeColor('background-primary')

  // If anyone's voting power is still loading, can't yet show the top members.
  const topMembers = members.some((member) => member.votingPowerPercent.loading)
    ? []
    : members
        .slice(0, VOTING_POWER_DISTRIBUTION_COLORS.length - 1)
        .map((member, index) => ({
          ...member,
          color:
            VOTING_POWER_DISTRIBUTION_COLORS[
              index % VOTING_POWER_DISTRIBUTION_COLORS.length
            ],
        }))
  const otherVotingPowerPercent = members
    .slice(VOTING_POWER_DISTRIBUTION_COLORS.length - 1)
    .reduce(
      (acc, member) =>
        acc +
        (member.votingPowerPercent.loading
          ? 0
          : member.votingPowerPercent.data),
      0
    )

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      {addMemberHref && (
        <div className="mb-6 flex min-h-[3.5rem] flex-row items-center justify-between gap-8 border-b border-b-border-secondary pb-6">
          <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
            <p className="title-text text-text-body">{t('title.newMember')}</p>
            <p className="secondary-text">{t('info.newMemberExplanation')}</p>
          </div>

          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={addMemberHref}
          >
            <Add className="!h-4 !w-4" />
            {t('button.addMembers')}
          </ButtonLink>
        </div>
      )}

      {topVoters && topMembers.length > 0 && (
        <div className="mb-6 flex flex-col items-stretch rounded-lg bg-background-tertiary sm:flex-row">
          <div className="flex grow flex-col gap-2 overflow-hidden p-6">
            <div className="mb-4 flex flex-row items-center gap-2">
              <p className="primary-text text-text-body">{topVoters.title}</p>

              <TooltipInfoIcon
                size="sm"
                title={t('info.percentagesShownAreVotingPower')}
              />
            </div>

            {topMembers.map(({ address, votingPowerPercent, color }) => (
              <div
                key={address}
                className="flex flex-row items-center justify-between gap-2"
              >
                <topVoters.EntityDisplay address={address} />

                <div className="flex flex-row items-center gap-3">
                  <p className="caption-text text-right font-mono text-text-tertiary">
                    {votingPowerPercent.loading
                      ? '...'
                      : formatPercentOf100(votingPowerPercent.data)}
                  </p>

                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            ))}

            {otherVotingPowerPercent > 0 && (
              <div className="mt-6 flex grow flex-row items-end justify-between gap-2">
                <p className="primary-text text-text-secondary">
                  {topVoters.otherTitle}
                </p>

                <div className="flex flex-row items-center gap-3">
                  <p className="caption-text text-right font-mono text-text-tertiary">
                    {formatPercentOf100(otherVotingPowerPercent)}
                  </p>

                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: otherColor,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex grow flex-col items-center gap-8 border-t border-border-secondary p-6 pb-12 sm:border-l sm:border-t-0">
            <p className="primary-text self-stretch text-text-body">
              {t('title.distribution')}
            </p>

            <div className="flex w-full max-w-[min(24rem,80%)] items-center justify-center">
              <Pie
                className="!aspect-square justify-self-center"
                data={{
                  labels: [
                    ...topMembers.map(({ address }) => address),
                    topVoters.otherTitle,
                  ],
                  datasets: [
                    {
                      data: [
                        ...topMembers.map(({ votingPowerPercent }) =>
                          votingPowerPercent.loading
                            ? 0
                            : votingPowerPercent.data
                        ),
                        otherVotingPowerPercent,
                      ],
                      backgroundColor: [
                        ...topMembers.map(({ color }) => color),
                        otherColor,
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  // Disable all events (hover, tooltip, etc.)
                  events: [],
                  animation: false,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className={clsx(
          'pb-6',
          // header min-height of 3.5rem standardized across all tabs
          !addMemberHref && 'flex min-h-[3.5rem] flex-row items-center '
        )}
      >
        <p className="title-text text-text-body">
          {t('title.numMembers', { count: members.length })}
        </p>
      </div>

      {members.length ? (
        <GridCardContainer>
          {members.map((props, index) => (
            <DaoMemberCard {...props} key={index} />
          ))}
        </GridCardContainer>
      ) : (
        <p className="secondary-text">{t('error.noMembers')}</p>
      )}
    </>
  )
}
