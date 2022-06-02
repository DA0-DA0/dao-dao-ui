import { ArcElement, Chart as ChartJS } from 'chart.js'
import clsx from 'clsx'
import { FC } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement)

interface Segment {
  name?: string
  percent: number
  color: string
}

interface TokenDistributionPieProps {
  data: Segment[]
}

export const TokenDistributionPie: FC<TokenDistributionPieProps> = ({
  data,
}) => (
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

export const TokenDistributionPieLegend: FC<
  TokenDistributionPieLegendProps
> = ({ data }) => (
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
