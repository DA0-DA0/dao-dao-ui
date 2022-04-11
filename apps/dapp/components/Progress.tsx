// Need color and width literals here because tailwind isn't able to generate
// the right classNames for the production build otherwise.
export const ProgressMany = ({
  data,
}: {
  data: {
    value: number
    color: string
  }[]
}) => (
  <div className="w-full h-1 bg-secondary flex flex-row items-stretch rounded-full overflow-hidden">
    {data.map(({ value, color }, index) => (
      <div
        key={index}
        className="h-full"
        style={{ width: `${Math.floor(value)}%`, backgroundColor: color }}
      ></div>
    ))}
  </div>
)

export const Progress = ({
  value,
  color,
}: {
  value: number
  color: string
}) => <ProgressMany data={[{ value, color }]} />
