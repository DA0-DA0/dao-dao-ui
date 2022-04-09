export function InputLabel({
  className,
  mono,
  name,
}: {
  className?: string
  mono?: boolean
  name: string
}) {
  return (
    <label className="flex">
      <span
        className={`caption-text ml-1 ${mono ? 'font-mono' : ''} ${className}`}
      >
        {name}
      </span>
    </label>
  )
}
