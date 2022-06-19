import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'
import clsx from 'clsx'
import { FC, useMemo } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

import { useTranslation } from '@dao-dao/i18n'
import { useNamedThemeColor } from '@dao-dao/ui'
import { CHAIN_BECH32_PREFIX, isValidAddress } from '@dao-dao/utils'

import { GovernanceTokenType, NewDAO, NewDAOStructure } from '@/atoms'

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

interface Entry {
  name?: string
  value: number
  color: string
}

interface DataProps {
  data: Entry[]
}

interface DistributionProps {
  newDAO: NewDAO
}

export const VotingPowerPieDistribution: FC<DistributionProps> = ({
  newDAO,
}) => {
  const { t } = useTranslation()
  const { onlyOneTier, entries } = useVotingPowerDistributionData(
    newDAO,
    true,
    true,
    true
  )

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center md:gap-x-16 md:gap-y-8">
      <p className="font-mono text-center caption-text">{t('Voting power')}</p>
      <p className="font-mono caption-text">
        {onlyOneTier ? t('Members') : t('Tier', { count: 1000 })}
      </p>

      <PieChart data={entries} />
      <Legend data={entries} />
    </div>
  )
}

export const useVotingPowerDistributionData = (
  {
    structure,
    tiers,
    governanceTokenOptions: {
      type,
      newInfo: { initialTreasuryBalance: _initialTreasuryBalance },
    },
  }: NewDAO,
  proportion: boolean,
  sort: boolean,
  includeTreasuryWhenApplicable: boolean
) => {
  const darkRgb = useNamedThemeColor('dark')

  return useMemo(() => {
    const initialTreasuryBalance =
      includeTreasuryWhenApplicable &&
      structure === NewDAOStructure.GovernanceToken &&
      type === GovernanceTokenType.New
        ? _initialTreasuryBalance
        : undefined

    // Only display valid addresses.
    const tiersWithValidMembers = tiers.map(({ members, ...tier }) => ({
      ...tier,
      members: members.filter(({ address }) =>
        isValidAddress(address, CHAIN_BECH32_PREFIX)
      ),
    }))

    const totalWeight =
      (tiersWithValidMembers.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0) + (initialTreasuryBalance ?? 0)

    // If one tier case, specially handle and display all members.
    const onlyOneTier = tiersWithValidMembers.length === 1

    let entries: Entry[] = onlyOneTier
      ? tiersWithValidMembers[0].members.map(({ address }, memberIndex) => ({
          name: address,
          value:
            tiersWithValidMembers[0].weight *
            (proportion ? 100 / totalWeight : 1),
          color: distributionColors[memberIndex % distributionColors.length],
        }))
      : tiersWithValidMembers.map(({ name, weight, members }, tierIndex) => ({
          name,
          value: weight * members.length * (proportion ? 100 / totalWeight : 1),
          color: distributionColors[tierIndex % distributionColors.length],
        }))
    if (sort) {
      entries.sort((a, b) => b.value - a.value)
    }

    // If set, add treasury to beginning, even if 0, to always display it.
    if (initialTreasuryBalance !== undefined) {
      const treasuryEntry: Entry = {
        name: 'Treasury',
        value: initialTreasuryBalance * (proportion ? 100 / totalWeight : 1),
        color: `rgba(${darkRgb}, 0.08)`,
      }
      entries.splice(0, 0, treasuryEntry)
    }

    return { entries, onlyOneTier }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    structure,
    type,
    _initialTreasuryBalance,
    sort,
    darkRgb,
    includeTreasuryWhenApplicable,
    proportion,
    // Tiers reference does not change even if contents do, so we need a
    // primitive to use for memoization comparison.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tiers
      .map(
        ({ weight, members }, idx) =>
          `${idx}:${weight}:${members.length}:${members
            .map(({ address }) => address)
            .join('_')}`
      )
      .join(),
  ])
}

const PieChart: FC<DataProps> = ({ data }) => (
  <Pie
    className="justify-self-center !w-32 !h-32 md:!w-48 md:!h-48"
    data={{
      datasets: [
        {
          data: data.map(({ value: percent }) => percent),
          backgroundColor: data.map(({ color }) => color),
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
)

export const VotingPowerChart: FC<DataProps> = ({ data }) => {
  const { t } = useTranslation()
  const darkRgb = useNamedThemeColor('dark')

  return (
    <div className="justify-self-center">
      <Bar
        data={{
          labels: data.map(({ name }) => name),
          datasets: [
            {
              data: data.map(({ value: percent }) => percent),
              backgroundColor: data.map(({ color }) => color),
              borderWidth: 0,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                title: (items) =>
                  items[0].label || t('Member address placeholder'),
                label: () => '',
              },
              titleMarginBottom: 0,
              position: 'center',
            },
          },
          // Horizontal bar chart
          indexAxis: 'y',
          responsive: true,
          scales: {
            x: {
              display: true,
              ticks: {
                color: `rgba(${darkRgb}, 0.2)`,
              },
              grid: {
                borderColor: `rgba(${darkRgb}, 0.1)`,
                color: `rgba(${darkRgb}, 0.1)`,
              },
            },
            y: {
              display: false,
            },
          },
        }}
      />
    </div>
  )
}

const Legend: FC<DataProps> = ({ data }) => (
  <div className="flex flex-col gap-1 md:gap-2">
    {data.map((allocation) => (
      <LegendItem key={allocation.name} data={allocation} />
    ))}
  </div>
)

interface LegendItemProps {
  data: Entry
}

const LegendItem: FC<LegendItemProps> = ({
  data: { name, value: percent, color },
}) => (
  <div
    key={name}
    className={clsx('grid gap-5 items-center', {
      'grid-cols-[0.25rem_7ch_auto]': !name,
      'grid-cols-[0.25rem_auto_7ch]': name,
    })}
  >
    <div
      className="shrink-0 w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
    ></div>

    {!!name && <p className="truncate primary-text">{name}</p>}

    <p className="font-mono text-sm text-right text-tertiary">
      {percent.toLocaleString(undefined, {
        maximumFractionDigits: 1,
      })}
      <span className="ml-[2px]">%</span>
    </p>
  </div>
)

// 1-10 linear from purple to orange/yellow.
// Intersperse colors so similar colors are not adjacent.
export const distributionColors = [
  '#5B58E2', // 1
  '#954FE7', // 4
  '#FC81A4', // 7
  '#F1B671', // 10
  '#4744AC', // 2
  '#BA73DD', // 5
  '#EE7969', // 8
  '#6642CE', // 3
  '#DE73C0', // 6
  '#F4925A', // 9
]
