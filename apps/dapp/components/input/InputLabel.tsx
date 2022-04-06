export function InputLabel({ name, mono }: { name: string; mono?: boolean }) {
  return (
    <label className="flex">
      <span className={`caption-text ml-1 ${mono ? 'font-mono' : ''}`}>
        {name}
      </span>
    </label>
  )
}
