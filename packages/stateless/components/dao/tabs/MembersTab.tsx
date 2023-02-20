import { Add } from '@mui/icons-material'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  TooltipOptions,
} from 'chart.js'
import clsx from 'clsx'
import { ComponentType, useCallback, useState } from 'react'
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
import { TooltipLikeDisplay } from '../../tooltip'
import { TooltipInfoIcon } from '../../tooltip/TooltipInfoIcon'
import { VOTING_POWER_DISTRIBUTION_COLORS } from '../create'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip)

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

const TOP_MEMBER_COUNT = VOTING_POWER_DISTRIBUTION_COLORS.length

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
    : members.slice(0, TOP_MEMBER_COUNT - 1).map((member, index) => ({
        ...member,
        color:
          VOTING_POWER_DISTRIBUTION_COLORS[
            index % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      }))
  const otherVotingPowerPercent = members
    .slice(TOP_MEMBER_COUNT - 1)
    .reduce(
      (acc, member) =>
        acc +
        (member.votingPowerPercent.loading
          ? 0
          : member.votingPowerPercent.data),
      0
    )

  const [tooltipData, setTooltipData] = useState<{
    address: string
    isOther: boolean
    top: number
    left: number
  }>()
  const tooltipMember =
    tooltipData &&
    members.find(({ address }) => address === tooltipData.address)
  const tooltipVotingPowerPercent =
    tooltipData &&
    (tooltipData.isOther
      ? otherVotingPowerPercent
      : tooltipMember &&
        (tooltipMember.votingPowerPercent.loading
          ? -1
          : tooltipMember.votingPowerPercent.data))

  // Show custom tooltip when built-in tooltip is supposed to show. This hacks
  // into the `external` callback of the pie chart's tooltip to mimic tooltip
  // behavior with custom content.
  const externalTooltipCallback: TooltipOptions<'pie'>['external'] =
    useCallback(
      (context) => {
        // If tooltip is supposed to hide, do nothing. If tooltip is already
        // showing, this will leave it showing. The pie chart container has an
        // `onMouseLeave` handler that hides the tooltip. This allows the user
        // to mouse over the tooltip and not have it disappear.
        if (context.tooltip.opacity === 0) {
          return
        }

        const newAddress = context.tooltip.dataPoints[0].label
        const isOther =
          context.tooltip.dataPoints[0].dataIndex === TOP_MEMBER_COUNT - 1
        if (!tooltipData || tooltipData.address !== newAddress) {
          const { x, y } = context.tooltip

          setTooltipData({
            address: newAddress,
            top: y,
            left: x,
            isOther,
          })
        }
      },
      [tooltipData]
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

            <div
              className="relative flex w-full max-w-[min(24rem,80%)] items-center justify-center"
              onMouseLeave={() => setTooltipData(undefined)}
            >
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
                  plugins: {
                    tooltip: {
                      enabled: false,
                      external: externalTooltipCallback,
                    },
                  },
                }}
              />
              {tooltipData && tooltipVotingPowerPercent && (
                <TooltipLikeDisplay
                  className="animate-fadein absolute flex-col items-start justify-center gap-2"
                  style={{ top: tooltipData.top, left: tooltipData.left }}
                >
                  {tooltipData.isOther ? (
                    <p className="primary-text">{topVoters.otherTitle}</p>
                  ) : (
                    <topVoters.EntityDisplay address={tooltipData.address} />
                  )}

                  <div className="flex flex-row items-center justify-between gap-2">
                    <p className="secondary-text">{t('title.votingPower')}:</p>

                    <p className="symbol-small-body-text font-mono">
                      {formatPercentOf100(tooltipVotingPowerPercent)}
                    </p>
                  </div>
                </TooltipLikeDisplay>
              )}
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
