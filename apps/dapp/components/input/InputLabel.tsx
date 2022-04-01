export function InputLabel({ name }: { name: string }) {
  return (
    <label className="flex">
      <span className="text-secondary text-sm ml-1">{name}</span>
    </label>
  )
}
