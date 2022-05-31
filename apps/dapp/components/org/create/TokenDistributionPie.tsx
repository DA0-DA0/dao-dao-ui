import { ArcElement, Chart as ChartJS } from 'chart.js'
import { FC } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement)

interface Segment {
  name: string
  percent: number
  color: string
}

interface TokenDistributionPieProps {
  segments: Segment[]
}

export const TokenDistributionPie: FC<TokenDistributionPieProps> = ({
  segments,
}) => (
  <Pie
    className="justify-self-center !w-32 !h-32 md:!w-48 md:!h-48"
    data={{
      datasets: [
        {
          data: segments.map(({ percent }) => percent),
          backgroundColor: segments.map((a) => a.color),
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

export const TokenDistributionPieLegend: FC<TokenDistributionPieProps> = ({
  segments,
}) => (
  <div className="flex flex-col gap-1 md:gap-2">
    {segments.map((allocation) => (
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
    className="grid grid-cols-[0.25rem_6ch_auto] gap-5 items-center"
  >
    <div
      className="shrink-0 w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
    ></div>

    <p className="primary-text">{name}</p>

    <p className="font-mono text-sm text-right text-tertiary">
      {percent.toLocaleString(undefined, {
        maximumFractionDigits: 1,
      })}
      <span className="ml-[2px]">%</span>
    </p>
  </div>
)
