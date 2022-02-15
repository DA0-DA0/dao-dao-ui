import { TooltipResponse } from 'components/TooltipsDisplay'
import { useThemeContext } from 'contexts/theme'

export function TooltipsDisplay({ selected }: { selected: TooltipResponse }) {
  const withSpaces = selected.label.replace(/([A-Z])/g, ' $1')
  const theme = useThemeContext()

  return (
    <div>
      <h2 className="font-medium text-lg capitalize mb-2">{withSpaces}</h2>
      <p className={`prose ${theme.theme === 'junoDark' && ' prose-invert'}`}>
        {selected.content}
      </p>
    </div>
  )
}
