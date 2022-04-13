import { TooltipResponse } from 'components/TooltipsDisplay'

export function TooltipsDisplay({ selected }: { selected: TooltipResponse }) {
  const withSpaces = selected.label.replace(/([A-Z])/g, ' $1')

  return (
    <div>
      <h2 className="mb-2 capitalize primary-text">{withSpaces}</h2>
      <p className="prose prose-sm dark:prose-invert">{selected.content}</p>
    </div>
  )
}
