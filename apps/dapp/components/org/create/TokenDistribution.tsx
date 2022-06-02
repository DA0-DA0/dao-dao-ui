import { ArcElement, Chart as ChartJS } from 'chart.js'
import clsx from 'clsx'
import { FC, useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { UseFormWatch } from 'react-hook-form'

import { InputLabel } from '@dao-dao/ui'

import { GovernanceTokenType, NewOrg } from '@/atoms/org'

ChartJS.register(ArcElement)

interface Segment {
  name?: string
  percent: number
  color: string
}

interface TokenDistributionPieProps {
  data: Segment[]
}

const TokenDistributionPie: FC<TokenDistributionPieProps> = ({ data }) => (
  <Pie
    className="justify-self-center !w-32 !h-32 md:!w-48 md:!h-48"
    data={{
      datasets: [
        {
          data: data.map(({ percent }) => percent),
          backgroundColor: data.map((a) => a.color),
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

type TokenDistributionPieLegendProps = TokenDistributionPieProps

const TokenDistributionPieLegend: FC<TokenDistributionPieLegendProps> = ({
  data,
}) => (
  <div className="flex flex-col gap-1 md:gap-2">
    {data.map((allocation) => (
      <LegendItem key={allocation.name} data={allocation} />
    ))}
  </div>
)

interface LegendItemProps {
  data: Segment
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

interface TokenDistributionProps {
  watch: UseFormWatch<NewOrg>
}

export const TokenDistribution: FC<TokenDistributionProps> = ({ watch }) => {
  const { governanceTokenEnabled, governanceTokenOptions, groups } = watch()

  const pieData = useMemo(() => {
    const initialTreasuryBalance =
      governanceTokenEnabled &&
      governanceTokenOptions.type === GovernanceTokenType.New
        ? governanceTokenOptions.newGovernanceToken.initialTreasuryBalance
        : 0

    const totalWeight =
      (groups.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0) + initialTreasuryBalance
    console.log(initialTreasuryBalance, totalWeight)

    // If one group case, specially handle and display all members.
    const onlyOneGroup = groups.length === 1

    const segments = groups
      .flatMap(({ weight, members }, groupIndex) =>
        members.map((_, memberIndex) => ({
          percent: (weight / totalWeight) * 100,
          color:
            colors[(onlyOneGroup ? memberIndex : groupIndex) % colors.length],
        }))
      )
      .sort((a, b) => b.percent - a.percent)
    const legend = (
      onlyOneGroup
        ? groups[0].members.map(({ address }, memberIndex) => ({
            name: address,
            percent: (groups[0].weight / totalWeight) * 100,
            color: colors[memberIndex % colors.length],
          }))
        : groups.map(({ name, weight, members }, groupIndex) => ({
            name,
            percent: ((weight * members.length) / totalWeight) * 100,
            color: colors[groupIndex % colors.length],
          }))
    ).sort((a, b) => b.percent - a.percent)

    // Add treasury to the beginning if exists.
    if (initialTreasuryBalance) {
      const segmentData = {
        name: 'Treasury',
        percent: (initialTreasuryBalance / totalWeight) * 100,
        color: `rgba(${getComputedStyle(document.body).getPropertyValue(
          '--dark'
        )}, 0.08)`,
      }
      segments.splice(0, 0, segmentData)
      legend.splice(0, 0, segmentData)
    }

    return { segments, legend }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Groups reference does not change even if contents do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    groups
      .map(
        ({ weight, members }, idx) => `${idx}:${weight}:${members.join('_')}`
      )
      .join(),
    governanceTokenEnabled,
    governanceTokenOptions.type,
    governanceTokenOptions.newGovernanceToken.initialTreasuryBalance,
  ])

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center md:gap-x-16 md:gap-y-8">
      <InputLabel
        className="text-sm text-center"
        labelProps={{ className: 'justify-center' }}
        mono
        name={
          governanceTokenEnabled
            ? 'Token Distribution'
            : 'Voting Power Distribution'
        }
      />
      <InputLabel className="text-sm text-center" mono name="Groups" />

      <TokenDistributionPie data={pieData.segments} />
      <TokenDistributionPieLegend data={pieData.legend} />
    </div>
  )
}

const colors = [
  '#FC82A4',
  '#954EE8',
  '#DC30D3',
  '#FD6386',
  'rgba(243, 246, 248, 0.08)',
]
