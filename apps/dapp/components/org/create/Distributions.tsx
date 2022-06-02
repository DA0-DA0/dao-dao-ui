import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from 'chart.js'
import clsx from 'clsx'
import { FC, useEffect, useMemo, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { UseFormWatch } from 'react-hook-form'

import { InputLabel, useThemeContext } from '@dao-dao/ui'

import { GovernanceTokenType, NewOrg, NewOrgGroup } from '@/atoms/org'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale)

interface DistributionProps {
  watch: UseFormWatch<NewOrg>
}

const getDarkRgb = () =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(document.body).getPropertyValue('--dark')
    : undefined

export const TokenDistribution: FC<DistributionProps> = ({ watch }) => {
  const { governanceTokenEnabled, governanceTokenOptions, groups } = watch()
  if (
    !governanceTokenEnabled ||
    governanceTokenOptions.type !== GovernanceTokenType.New
  )
    throw new Error(
      'TokenDistribution can only be displayed when using a new governance token.'
    )

  const { themeChangeCount } = useThemeContext()
  const [darkRgb, setDarkRgb] = useState<string>()
  useEffect(
    () => {
      setDarkRgb(getDarkRgb())
    },
    // Re-fetch color when theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeChangeCount]
  )

  const data = useMemo(() => {
    const { initialTreasuryBalance } = governanceTokenOptions.newGovernanceToken

    const totalWeight =
      (groups.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0) + initialTreasuryBalance

    // If one group case, specially handle and display all members.
    const onlyOneGroup = groups.length === 1

    const entries = groups
      .flatMap(({ weight, members }, groupIndex) =>
        members.map((_, memberIndex) => ({
          percent: (weight / totalWeight) * 100,
          color:
            distributionColors[
              (onlyOneGroup ? memberIndex : groupIndex) %
                distributionColors.length
            ],
        }))
      )
      .sort((a, b) => b.percent - a.percent)
    const legend = (
      onlyOneGroup
        ? groups[0].members.map(({ address }, memberIndex) => ({
            name: address,
            percent: (groups[0].weight / totalWeight) * 100,
            color: distributionColors[memberIndex % distributionColors.length],
          }))
        : groups.map(({ name, weight, members }, groupIndex) => ({
            name,
            percent: ((weight * members.length) / totalWeight) * 100,
            color: distributionColors[groupIndex % distributionColors.length],
          }))
    ).sort((a, b) => b.percent - a.percent)

    // Add treasury to the beginning, even if 0, so we display it always.
    const treasuryEntry = {
      name: 'Treasury',
      percent: (initialTreasuryBalance / totalWeight) * 100,
      color: `rgba(${darkRgb}, 0.08)`,
    }
    entries.splice(0, 0, treasuryEntry)
    legend.splice(0, 0, treasuryEntry)

    return { entries, legend, onlyOneGroup }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Groups reference does not change even if contents do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    groups
      .map(
        ({ weight, members }, idx) => `${idx}:${weight}:${members.join('_')}`
      )
      .join(),
    governanceTokenOptions.newGovernanceToken.initialTreasuryBalance,
    darkRgb,
  ])

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center md:gap-x-16 md:gap-y-8">
      <InputLabel
        className="text-sm text-center"
        labelProps={{ className: 'justify-center' }}
        mono
        name="Token Distribution"
      />
      <InputLabel
        className="text-sm text-center"
        mono
        name={data.onlyOneGroup ? 'Members' : 'Groups'}
      />

      <TokenDistributionPie data={data.entries} />
      <Legend data={data.legend} />
    </div>
  )
}

export const useVotingPowerDistributionData = (
  groups: NewOrgGroup[],
  // Groups reference does not change even if contents do, so we need a
  // primitive to use for memoization comparison.
  groupsChangedString: string,
  sort: boolean
) =>
  useMemo(() => {
    const totalWeight =
      groups.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0

    // If one group case, specially handle and display all members.
    const onlyOneGroup = groups.length === 1

    const entries = onlyOneGroup
      ? groups[0].members.map(({ address }, memberIndex) => ({
          name: address,
          percent: (groups[0].weight / totalWeight) * 100,
          color: distributionColors[memberIndex % distributionColors.length],
        }))
      : groups.map(({ name, weight, members }, groupIndex) => ({
          name,
          percent: ((weight * members.length) / totalWeight) * 100,
          color: distributionColors[groupIndex % distributionColors.length],
        }))
    if (sort) {
      entries.sort((a, b) => b.percent - a.percent)
    }

    return { entries, onlyOneGroup }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sort,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    groupsChangedString,
  ])

export const VotingPowerDistribution: FC<DistributionProps> = ({ watch }) => {
  const groups = watch('groups')
  const { onlyOneGroup, entries } = useVotingPowerDistributionData(
    groups,
    groups
      .map(
        ({ weight, members }, idx) => `${idx}:${weight}:${members.join('_')}`
      )
      .join(),
    true
  )

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center md:gap-x-16 md:gap-y-8">
      <InputLabel
        className="text-sm text-center"
        labelProps={{ className: 'justify-center' }}
        mono
        name="Voting Power Distribution"
      />
      <InputLabel
        className="text-sm text-center"
        mono
        name={onlyOneGroup ? 'Members' : 'Groups'}
      />

      <VotingPowerChart data={entries} />
      <Legend data={entries} />
    </div>
  )
}

interface Entry {
  name?: string
  percent: number
  color: string
}

interface DataProps {
  data: Entry[]
}

const TokenDistributionPie: FC<DataProps> = ({ data }) => (
  <Pie
    className="justify-self-center !w-32 !h-32 md:!w-48 md:!h-48"
    data={{
      datasets: [
        {
          data: data.map(({ percent }) => percent),
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
  const { themeChangeCount } = useThemeContext()
  const [darkRgb, setDarkRgb] = useState<string>()
  useEffect(
    () => {
      setDarkRgb(getDarkRgb())
    },
    // Re-fetch color when theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeChangeCount]
  )

  return (
    <div className="justify-self-center">
      <Bar
        data={{
          labels: data.map(({ name }) => name),
          datasets: [
            {
              data: data.map(({ percent }) => percent),
              backgroundColor: data.map(({ color }) => color),
              borderWidth: 0,
            },
          ],
        }}
        options={{
          // Disable all events (hover, tooltip, etc.)
          events: [],
          animation: false,
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
  data: { name, percent, color },
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

export const distributionColors = ['#FC82A4', '#954EE8', '#DC30D3', '#FD6386']
