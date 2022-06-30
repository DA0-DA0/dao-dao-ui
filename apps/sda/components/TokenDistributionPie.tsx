import { ArcElement, Chart as ChartJS } from 'chart.js'
import { FunctionComponent } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement)

interface AllocationSection {
  name: string
  percent: number
  color: string
}

export const TokenDistributionPie: FunctionComponent = () => {
  const allocationSections = [
    {
      name: 'Fairdrop',
      percent: 20,
      color: '#FC82A4',
    },
    {
      name: 'Founding Team',
      percent: 3.33,
      color: '#954EE8',
    },
    {
      name: 'Founding Team (2 year vesting)',
      percent: 6.67,
      color: '#DC30D3',
    },
    {
      name: 'Development Reserve',
      percent: 10,
      color: '#FD6386',
    },
    {
      name: 'Rewards and Incentives',
      percent: 60,
      color: 'rgba(243, 246, 248, 0.08)',
    },
  ]

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8 md:h-full md:flex-col">
      <Pie
        className="!h-48 !w-48 self-center"
        data={{
          datasets: [
            {
              data: allocationSections.map(({ percent }) => percent),
              backgroundColor: allocationSections.map((a) => a.color),
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

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {allocationSections.map((allocation) => (
          <LegendItem key={allocation.name} data={allocation} />
        ))}
      </div>
    </div>
  )
}

interface LegendItemProps {
  data: AllocationSection
}

const LegendItem: FunctionComponent<LegendItemProps> = ({
  data: { name, percent, color },
}) => {
  return (
    <div
      key={name}
      className="grid grid-cols-[0.25rem_6ch_auto] items-center gap-3"
    >
      <div
        className="shrink-02 h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      ></div>

      <p className="caption-text text-right font-mono text-tertiary">
        {percent.toLocaleString(undefined, {
          maximumFractionDigits: 1,
        })}
        <span className="ml-[2px]">%</span>
      </p>

      <p className="primary-text">{name}</p>
    </div>
  )
}
