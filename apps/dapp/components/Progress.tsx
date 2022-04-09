// Need color and width literals here because tailwind isn't able to generate
// the right classNames for the production build otherwise.
export const Progress = ({
  turnout,
  color,
}: {
  turnout: number
  color: string
}) => {
  turnout = Math.floor(turnout)
  return (
    <div className="w-full h-1 bg-secondary rounded-md">
      <div
        className="h-full rounded-lg"
        style={{ width: `${turnout}%`, backgroundColor: color }}
      ></div>
    </div>
  )
}
