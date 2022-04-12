// Need color and width literals here because tailwind isn't able to generate
// the right classNames for the production build otherwise.
export const ProgressMany = ({
  rows,
  verticalBars = [],
}: {
  rows: {
    backgroundColor?: string
    data: {
      value: number
      color: string
    }[]
  }[]
  verticalBars?: {
    value: number
    label?: string
  }[]
}) => (
  <div className="relative w-full">
    <div
      className={`w-full flex flex-col items-stretch rounded-full overflow-hidden`}
    >
      {rows.map(({ backgroundColor, data }, rowIndex) => (
        <div
          key={rowIndex}
          className="h-1 flex flex-row items-stretch"
          style={backgroundColor ? { backgroundColor } : {}}
        >
          {data.map(({ value, color }, index) => (
            <div
              key={index}
              className="h-full"
              style={{ width: `${Math.floor(value)}%`, backgroundColor: color }}
            ></div>
          ))}
        </div>
      ))}
    </div>

    {verticalBars.map(({ value, label }, index) => (
      <div
        key={index}
        className="absolute bg-brand w-[2px] h-3 -top-1 rounded-full"
        style={{ left: `${Math.floor(value)}%` }}
      >
        {!!label && <p className="absolute font-mono text-brand -top-4" style={{ fontSize: 8, lineHeight: 2 }}>{label}</p>}
      </div>
    ))}
  </div>
)

export const Progress = ({
  value,
  color,
}: {
  value: number
  color: string
}) => <ProgressMany rows={[{ data: [{ value, color }] }]} />
