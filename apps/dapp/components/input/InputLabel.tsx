export function InputLabel({ name }: { name: string }) {
  return (
    <label className="label">
      <span className="label-text text-secondary text-medium">{name}</span>
    </label>
  )
}
