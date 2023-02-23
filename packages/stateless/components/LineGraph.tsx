import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { useNamedThemeColor, useThemeContext } from '../theme'

ChartJS.register(LinearScale, LineElement, CategoryScale, PointElement, Title)

export interface LineGraphProps {
  title: string
  yTitle: string
  yValues: number[]
  labels?: string[]
  className?: string
}

export const LineGraph = ({
  title,
  yTitle,
  yValues,
  labels,
  className,
}: LineGraphProps) => {
  const { accentColor } = useThemeContext()
  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')

  return (
    <Line
      className={className}
      data={{
        labels: labels || yValues.map(() => ''),
        datasets: [
          {
            data: yValues,
            borderColor: accentColor,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        // Disable all events (hover, tooltip, etc.)
        events: [],
        animation: false,
        elements: {
          point: {
            radius: 0,
          },
        },
        plugins: {
          title: {
            display: true,
            text: title,
            color: textColor,
            font: {
              weight: 'normal',
            },
          },
        },
        scales: {
          x: {
            display: !!labels,
            ticks: {
              color: textColor,
            },
            grid: {
              color: borderColor,
              tickColor: 'transparent',
            },
          },
          y: {
            display: true,
            title: {
              text: yTitle,
              display: true,
              color: textColor,
            },
            ticks: {
              color: textColor,
            },
            grid: {
              color: borderColor,
              tickColor: 'transparent',
            },
          },
        },
      }}
    />
  )
}
