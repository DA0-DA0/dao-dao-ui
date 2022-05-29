import { TooltipResponse } from 'components/TooltipsDisplay'

export function TooltipsDisplay({ selected }: { selected: TooltipResponse }) {
  const withSpaces = selected.label.replace(/([A-Z])/g, ' $1')

  return (
    <div className="overflow-scroll fixed top-0 p-6 mr-4 h-full">
      <div className="py-6 px-8 w-full bg-card rounded-md">
        <h2 className="mb-2 font-mono capitalize primary-text">{withSpaces}</h2>
        <p className="font-normal prose prose-sm dark:prose-invert">
          {selected.content}
        </p>
      </div>
    </div>
  )
}
