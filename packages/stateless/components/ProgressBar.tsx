import { ArrowDropUp } from '@mui/icons-material'

import { Tooltip } from './Tooltip'

export interface ProgressBarProps {
  rows: {
    backgroundColor?: string
    thickness: number
    data: {
      value: number
      color: string
    }[]
  }[]
  caretPosition?: number
  caretTooltip?: string
  alignEnd?: boolean
}

export const ProgressBar = ({
  rows,
  caretPosition,
  caretTooltip,
  alignEnd,
}: ProgressBarProps) => (
  <div className="relative w-full">
    <div
      className={`flex w-full flex-col items-stretch overflow-hidden rounded-full`}
    >
      {rows.map(({ backgroundColor, data, thickness }, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex flex-row items-stretch ${
            !backgroundColor ? 'bg-background-secondary' : ''
          } ${alignEnd ? 'justify-end' : ''}`}
          style={{
            backgroundColor,
            height: thickness,
          }}
        >
          {data.map(({ value, color }, index) => (
            <div
              key={index}
              className="h-full"
              style={{ width: `${value}%`, backgroundColor: color }}
            ></div>
          ))}
        </div>
      ))}
    </div>

    <Tooltip title={caretTooltip}>
      <ArrowDropUp
        className="text-icon-primary absolute bottom-[-0.825rem] z-10 !h-6 !w-6"
        style={{
          left: `${caretPosition}%`,
        }}
      />
    </Tooltip>
  </div>
)
