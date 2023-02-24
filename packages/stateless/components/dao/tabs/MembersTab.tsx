import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  StatefulDaoMemberCardProps,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { ButtonLinkProps } from '../../buttons'
import { GridCardContainer } from '../../GridCardContainer'
import { Dropdown, DropdownOption } from '../../inputs/Dropdown'
import { TooltipInfoIcon } from '../../tooltip/TooltipInfoIcon'
import { VOTING_POWER_DISTRIBUTION_COLORS_ORDERED } from '../create'

export interface MembersTabProps {
  DaoMemberCard: ComponentType<StatefulDaoMemberCardProps>
  members: StatefulDaoMemberCardProps[]
  isMember: boolean
  addMemberHref?: string
  ButtonLink: ComponentType<ButtonLinkProps>
  // If defined, will show the top voter distribution.
  topVoters?: {
    otherTitle: string
    EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  }
}

// Store absolutes as negative numbers and percentages as positive numbers.
enum TopStakerState {
  TenAbsolute = -10,
  TenPercent = 10,
  TwentyPercent = 20,
  All = 100,
}

const NUM_VERTICAL_BARS = 10

export const MembersTab = ({
  DaoMemberCard,
  members,
  isMember,
  addMemberHref,
  ButtonLink,
  topVoters,
}: MembersTabProps) => {
  const { t } = useTranslation()

  const [topStakerState, setTopStakerState] = useState(
    TopStakerState.TenAbsolute
  )
  const topStakerStateOptions: DropdownOption<TopStakerState>[] = [
    {
      label: t('title.topAbsolute', { count: -TopStakerState.TenAbsolute }),
      value: TopStakerState.TenAbsolute,
    },
    {
      label: t('title.topPercent', { percent: TopStakerState.TenPercent }),
      value: TopStakerState.TenPercent,
    },
    {
      label: t('title.topPercent', { percent: TopStakerState.TwentyPercent }),
      value: TopStakerState.TwentyPercent,
    },
    {
      label: t('title.all'),
      value: TopStakerState.All,
    },
  ]
  const topStakerStateOption = topStakerStateOptions.find(
    (option) => option.value === topStakerState
  )

  // If anyone's voting power is still loading, can't yet show the top members.
  const sortedMembers = members.some(
    (member) => member.votingPowerPercent.loading
  )
    ? []
    : members.sort(
        (a, b) =>
          (b.votingPowerPercent.loading ? 0 : b.votingPowerPercent.data) -
          (a.votingPowerPercent.loading ? 0 : a.votingPowerPercent.data)
      )

  // Get members that hold the top x% of voting power.
  const topMemberUpperIndex =
    topStakerState < 0
      ? -topStakerState
      : sortedMembers.reduce(
          (acc, member, index) => ({
            total:
              acc.total +
              (member.votingPowerPercent.loading
                ? 0
                : member.votingPowerPercent.data),
            // If the current total is past the top x%, keep the index the same. This
            // index is the index of the last member in the top x% of voting power.
            index: acc.total >= topStakerState ? acc.index : index,
          }),
          { total: 0, index: 0 }
        ).index + 1

  const topMembers = sortedMembers.slice(0, topMemberUpperIndex)
  const topMembersVotingPowerPercent = topMembers.reduce(
    (acc, member) =>
      acc +
      (member.votingPowerPercent.loading ? 0 : member.votingPowerPercent.data),
    0
  )
  const otherVotingPowerPercent = members
    .slice(topMemberUpperIndex)
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
        <div className="mb-6 flex flex-col items-stretch rounded-lg bg-background-tertiary">
          <div className="flex grow flex-col gap-2 overflow-hidden p-6">
            <div className="mb-4 flex flex-row items-stretch justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <p className="primary-text text-text-body">
                  {t('title.whoControlsDaoQuestion')}
                </p>

                <TooltipInfoIcon
                  size="sm"
                  title={t('info.percentagesShownAreVotingPower')}
                />
              </div>

              <Dropdown
                onSelect={setTopStakerState}
                options={topStakerStateOptions}
                selected={topStakerState}
              />
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-1">
              {topMembers.map(({ address, votingPowerPercent }, index) => (
                <Fragment key={address}>
                  <topVoters.EntityDisplay address={address} />

                  <div className="relative flex h-8 w-full flex-row items-stretch justify-between">
                    {/* Bar color */}
                    <div
                      className="absolute top-0 bottom-0 left-0"
                      style={{
                        backgroundColor:
                          VOTING_POWER_DISTRIBUTION_COLORS_ORDERED[
                            index %
                              VOTING_POWER_DISTRIBUTION_COLORS_ORDERED.length
                          ],
                        width: votingPowerPercent.loading
                          ? 0
                          : formatPercentOf100(votingPowerPercent.data),
                      }}
                    ></div>

                    {/* Vertical bars */}
                    {[...Array(NUM_VERTICAL_BARS)].map((_, index) => (
                      <div
                        key={index}
                        className="-mt-[2px] -mb-[2px] w-[1px] bg-border-secondary"
                      ></div>
                    ))}
                  </div>

                  <p className="caption-text text-right font-mono text-text-tertiary">
                    {votingPowerPercent.loading
                      ? '...'
                      : formatPercentOf100(votingPowerPercent.data)}
                  </p>
                </Fragment>
              ))}

              {topMembersVotingPowerPercent > 0 && (
                <>
                  {/* Space row */}
                  <div></div>
                  <Bar color="transparent" percent={0} />
                  <div></div>

                  <p className="primary-text font-bold text-text-secondary">
                    {topStakerStateOption?.label ?? t('title.total')}
                  </p>

                  <Bar
                    color="var(--text-tertiary)"
                    percent={topMembersVotingPowerPercent}
                  />

                  <p className="caption-text text-right font-mono text-text-tertiary">
                    {formatPercentOf100(topMembersVotingPowerPercent)}
                  </p>
                </>
              )}

              {otherVotingPowerPercent > 0 && (
                <>
                  <p className="primary-text font-bold text-text-secondary">
                    {topVoters.otherTitle}
                  </p>

                  <Bar
                    color="var(--text-interactive-disabled)"
                    percent={otherVotingPowerPercent}
                  />

                  <p className="caption-text text-right font-mono text-text-tertiary">
                    {formatPercentOf100(otherVotingPowerPercent)}
                  </p>
                </>
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

type BarProps = {
  color: string
  percent: number
}

const Bar = ({ color, percent }: BarProps) => (
  <div className="relative flex h-8 w-full flex-row items-stretch justify-between">
    {/* Bar color */}
    <div
      className="absolute top-0 bottom-0 left-0"
      style={{
        backgroundColor: color,
        width: formatPercentOf100(percent),
      }}
    ></div>

    {/* Vertical bars */}
    {[...Array(NUM_VERTICAL_BARS)].map((_, index) => (
      <div
        key={index}
        className="-mt-[2px] -mb-[2px] w-[1px] bg-border-secondary"
      ></div>
    ))}
  </div>
)
