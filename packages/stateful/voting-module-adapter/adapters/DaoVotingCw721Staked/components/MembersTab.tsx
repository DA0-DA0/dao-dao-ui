import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { DaoVotingCw721StakedSelectors } from '@dao-dao/state/recoil'
import {
  Loader,
  MembersTab as StatelessMembersTab,
  TooltipInfoIcon,
  VOTING_POWER_DISTRIBUTION_COLORS,
  useCachedLoadable,
  useNamedThemeColor,
} from '@dao-dao/stateless'
import { formatPercentOf100 } from '@dao-dao/utils'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../react/context'

declare module 'chart.js' {
  interface TooltipPositionerMap {
    center: TooltipPositionerFunction<ChartType>
  }
}

Tooltip.positioners.center = function (elements, eventPosition) {
  const pos = Tooltip.positioners.average.bind(this)(elements, eventPosition)

  return (
    pos && {
      x: pos.x / 2,
      y: pos.y,
      xAlign: 'center',
      yAlign: 'bottom',
    }
  )
}

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip)

export const MembersTab = () => {
  const { t } = useTranslation()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const topStakersLoadable = useCachedLoadable(
    DaoVotingCw721StakedSelectors.topStakersSelector({
      contractAddress: votingModuleAddress,
    })
  )

  const otherColor = useNamedThemeColor('background-primary')

  const topStakers =
    topStakersLoadable.state === 'hasValue' && topStakersLoadable.contents
      ? [
          ...topStakersLoadable.contents.slice(0, 9).map((staker, index) => ({
            ...staker,
            isOther: false,
            color:
              VOTING_POWER_DISTRIBUTION_COLORS[
                index % VOTING_POWER_DISTRIBUTION_COLORS.length
              ],
          })),
          // If there are more than 9 stakers, add an "Others" entry.
          ...(topStakersLoadable.contents.length > 9
            ? [
                {
                  address: '',
                  count: topStakersLoadable.contents
                    .slice(9)
                    .reduce((acc, { count }) => acc + count, 0),
                  votingPowerPercent: topStakersLoadable.contents
                    .slice(9)
                    .reduce(
                      (acc, { votingPowerPercent }) =>
                        acc + Number(votingPowerPercent),
                      0
                    ),
                  isOther: true,
                  color: otherColor,
                },
              ]
            : []),
        ]
      : []

  const memberCards: ComponentPropsWithoutRef<typeof DaoMemberCard>[] = (
    (topStakersLoadable.state === 'hasValue' && topStakersLoadable.contents) ||
    []
  ).map(({ address, votingPowerPercent }) => ({
    address,
    votingPowerPercent: { loading: false, data: votingPowerPercent },
  }))

  return (
    <>
      {topStakersLoadable.state === 'loading' ? (
        <Loader />
      ) : topStakersLoadable.state === 'hasError' ||
        !topStakersLoadable.contents ? (
        <p>{t('error.loadingData')}</p>
      ) : topStakersLoadable.contents.length === 0 ? (
        <p>{t('info.nothingFound')}</p>
      ) : (
        <div className="flex flex-col items-stretch rounded-lg bg-background-tertiary sm:flex-row">
          <div className="flex grow flex-col gap-2 overflow-hidden p-6">
            <div className="mb-4 flex flex-row items-center gap-2">
              <p className="primary-text text-text-body">
                {t('title.topStakers')}
              </p>

              <TooltipInfoIcon
                size="sm"
                title={t('info.percentagesShownAreVotingPower')}
              />
            </div>

            {topStakers.map(
              ({ address, votingPowerPercent, isOther, color }, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex flex-row justify-between gap-2',
                    isOther ? 'mt-6 grow items-end' : 'items-center'
                  )}
                >
                  {isOther ? (
                    <p className="primary-text text-text-secondary">
                      {t('title.otherStakers')}
                    </p>
                  ) : (
                    <EntityDisplay address={address} />
                  )}

                  <div className="flex flex-row items-center gap-3">
                    <p className="caption-text text-right font-mono text-text-tertiary">
                      {formatPercentOf100(votingPowerPercent)}
                    </p>

                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                  </div>
                </div>
              )
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
                  labels: topStakers.map(({ address }) => address),
                  datasets: [
                    {
                      data: topStakers.map(({ votingPowerPercent }) =>
                        Number(votingPowerPercent)
                      ),
                      backgroundColor: topStakers.map(({ color }) => color),
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

      <div className="mt-6">
        <StatelessMembersTab
          ButtonLink={ButtonLink}
          DaoMemberCard={DaoMemberCard}
          isMember={false}
          members={memberCards}
        />
      </div>
    </>
  )
}
