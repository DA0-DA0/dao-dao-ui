import { TooltipResponse } from 'components/TooltipsDisplay'

export function TooltipsDisplay({ selected }: { selected: TooltipResponse }) {
  const withSpaces = selected.label.replace(/([A-Z])/g, ' $1')

  return (
    <div>
      <h2 className="primary-text mb-2 capitalize">{withSpaces}</h2>
      <p className={`prose dark:prose-invert prose-sm`}>{selected.content}</p>
    </div>
  )
}
