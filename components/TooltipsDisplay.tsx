import { useThemeContext } from 'contexts/theme'
import { TooltipResponse } from 'tooltips/useTooltipsReguster'

export function TooltipsDisplay({ selected }: { selected: TooltipResponse }) {
  const withSpaces = selected.label.replace(/([A-Z])/g, ' $1')
  const theme = useThemeContext()

  return (
    <div className="">
      <h2 className="font-medium text-lg capitalize mb-2">{withSpaces}</h2>
      <p className={`prose ${theme.theme === 'junoDark' && ' prose-invert'}`}>
        {selected.content}
      </p>
    </div>
  )
}
