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
}

export const LineGraph = ({ title, yTitle, yValues }: LineGraphProps) => {
  const { accentColor } = useThemeContext()
  const darkRgb = `rgba(${useNamedThemeColor('dark')}, 0.2)`

  return (
    <Line
      data={{
        labels: yValues.map(() => ''),
        datasets: [
          {
            data: yValues,
            borderColor: accentColor,
          },
        ],
      }}
      options={{
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
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: true,
            title: {
              text: yTitle,
              display: true,
              color: darkRgb,
            },
            ticks: {
              color: darkRgb,
            },
            grid: {
              borderColor: darkRgb,
              color: darkRgb,
            },
          },
        },
      }}
    />
  )
}
