// Need color and width literals here because tailwind isn't able to generate
// the right classNames for the production build otherwise.
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
          className={`flex flex-row items-stretch ${!backgroundColor ? "bg-secondary" : ""} ${alignEnd ? "justify-end" : ""}`}
          style={{
            backgroundColor,
            height: thickness,
          }}
        >
          {data.map(({ value, color }, index) => (
            <div
              key={index}
              className={`h-full ${index === data.length - 1 && !alignEnd ? "rounded-r-full" : ""} ${index === 0 && alignEnd ? "rounded-l-full" : ""}`}
              style={{ width: `${value}%`, backgroundColor: color }}
            ></div>
          ))}
        </div>
      ))}
    </div>

    {verticalBars.map(({ value, color, label }, index) => (
      <div
        key={index}
        className="absolute w-[2px] -top-[3px] rounded-full"
        style={{ left: `${Math.floor(value)}%`, backgroundColor: color, height: rows.reduce((sum, row) => row.thickness + sum, 6) }}
      >
        {!!label && <p className="absolute font-mono -top-4" style={{ fontSize: 8, lineHeight: 2, color }}>{label}</p>}
      </div>
    ))}
  </div>
)
