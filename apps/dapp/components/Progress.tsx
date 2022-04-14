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
    label?: string
  }[]
  alignEnd?: boolean
}) => (
  <div className="relative w-full">
    <div
      className={`w-full flex flex-col items-stretch rounded-full overflow-hidden`}
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

    {verticalBars.map(({ value, color, label }, index) => (
      <div
        key={index}
        className="absolute -top-[3px] w-[2px] rounded-full"
        style={{
          left: `${value}%`,
          backgroundColor: color,
          height: rows.reduce((sum, row) => row.thickness + sum, 6),
        }}
      >
        {!!label && (
          <p
            className="absolute -top-4 font-mono"
            style={{ fontSize: 8, lineHeight: 2, color }}
          >
            {label}
          </p>
        )}
      </div>
    ))}
  </div>
)
