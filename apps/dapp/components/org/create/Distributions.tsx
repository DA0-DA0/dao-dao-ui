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
import { Pie, Bar } from 'react-chartjs-2'

import { InputLabel, useNamedThemeColor } from '@dao-dao/ui'

import { GovernanceTokenType, NewOrg, NewOrgStructure } from '@/atoms/newOrg'

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
  newOrg: NewOrg
}

export const VotingPowerPieDistribution: FC<DistributionProps> = ({
  newOrg,
}) => {
  const { onlyOneGroup, entries } = useVotingPowerDistributionData(
    newOrg,
    true,
    true,
    true
  )

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center md:gap-x-16 md:gap-y-8">
      <p className="caption-text font-mono text-center">Voting Power</p>
      <p className="caption-text font-mono">
        {onlyOneGroup ? 'Members' : 'Groups'}
      </p>

      <PieChart data={entries} />
      <Legend data={entries} />
    </div>
  )
}

export const useVotingPowerDistributionData = (
  {
    structure,
    groups,
    governanceTokenOptions: {
      type,
      newInfo: { initialTreasuryBalance: _initialTreasuryBalance },
    },
  }: NewOrg,
  proportion: boolean,
  sort: boolean,
  includeTreasuryWhenApplicable: boolean
) => {
  const darkRgb = useNamedThemeColor('dark')

  return useMemo(() => {
    const initialTreasuryBalance =
      includeTreasuryWhenApplicable &&
      structure === NewOrgStructure.UsingGovToken &&
      type === GovernanceTokenType.New
        ? _initialTreasuryBalance
        : undefined

    const totalWeight =
      (groups.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0) + (initialTreasuryBalance ?? 0)

    // If one group case, specially handle and display all members.
    const onlyOneGroup = groups.length === 1

    const entries: Entry[] = onlyOneGroup
      ? groups[0].members.map(({ address }, memberIndex) => ({
          name: address,
          value: groups[0].weight * (proportion ? 100 / totalWeight : 1),
          color: distributionColors[memberIndex % distributionColors.length],
        }))
      : groups.map(({ name, weight, members }, groupIndex) => ({
          name,
          value: weight * members.length * (proportion ? 100 / totalWeight : 1),
          color: distributionColors[groupIndex % distributionColors.length],
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

    return { entries, onlyOneGroup }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    structure,
    type,
    _initialTreasuryBalance,
    sort,
    darkRgb,
    includeTreasuryWhenApplicable,
    proportion,
    // Groups reference does not change even if contents do, so we need a
    // primitive to use for memoization comparison.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    groups
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
                title: (items) => items[0].label || "Member's address...",
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

// Linear from purple to orange/yellow.
const _distributionColors = [
  '#5B58E2',
  '#4744AC',
  '#6642CE',
  '#954FE7',
  '#BA73DD',
  '#DE73C0',
  '#FC81A4',
  '#EE7969',
  '#F4925A',
  '#F1B671',
]
// Increase speed of color transition by doing every other in a loop.
// For 10 colors, even indexes from 0 to 8, then odd indexes from 1 to 9.
export const distributionColors = _distributionColors.map((_, idx) =>
  idx < _distributionColors.length / 2
    ? _distributionColors[idx * 2]
    : _distributionColors[(idx - _distributionColors.length / 2) * 2 + 1]
)
