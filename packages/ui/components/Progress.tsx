// The height in pixels a vertical bar extends beyond the progress bar on top and bottom.
const VERTICAL_BAR_PADDING = 5

export const Progress = ({
  rows,
  verticalBars = [],
  alignEnd,
}: {
  rows: {
    backgroundColor?: string
    thickness: number
    data: {
      value: number
      color: string
    }[]
  }[]
  verticalBars?: {
    value: number
    color: string
  }[]
  alignEnd?: boolean
}) => (
  <div className="relative w-full">
    <div
      className={`flex w-full flex-col items-stretch overflow-hidden rounded-full`}
    >
      {rows.map(({ backgroundColor, data, thickness }, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex flex-row items-stretch ${
            !backgroundColor ? 'bg-secondary' : ''
          } ${alignEnd ? 'justify-end' : ''}`}
          style={{
            backgroundColor,
            height: thickness,
          }}
        >
          {data.map(({ value, color }, index) => (
            <div
              key={index}
              className={`h-full ${
                index === data.length - 1 && !alignEnd ? 'rounded-r-full' : ''
              } ${index === 0 && alignEnd ? 'rounded-l-full' : ''}`}
              style={{ width: `${value}%`, backgroundColor: color }}
            ></div>
          ))}
        </div>
      ))}
    </div>

    {verticalBars.map(({ value, color }, index) => (
      <div
        key={index}
        className="absolute w-[2px] rounded-full"
        style={{
          left: `${value}%`,
          backgroundColor: color,
          // Extend above and below bar.
          top: -VERTICAL_BAR_PADDING,
          bottom: -VERTICAL_BAR_PADDING,
        }}
      ></div>
    ))}
  </div>
)
