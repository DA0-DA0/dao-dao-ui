import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type SearchBarProps = {
  currentRefinement: string
  refine: (s: string) => void
  onEmptyBack: () => void
}

export const SearchBar: FC<SearchBarProps> = ({
  currentRefinement,
  refine,
  onEmptyBack,
}) => (
  <div className="flex items-center px-3 text-tertiary border-b border-default">
    <input
      autoFocus
      className="py-4 px-2 w-full bg-transparent focus:outline-none primary-text focus:ring-none" // Keep focus when clicking on hit
      onBlur={(ev) => ev.target.focus()}
      onChange={(event) => refine(event.currentTarget.value)}
      onKeyDown={(ev) => {
        if (ev.key == 'ArrowUp' || ev.key == 'ArrowDown')
          return ev.preventDefault()
        else if (currentRefinement == '' && ev.key == 'Backspace')
          return onEmptyBack()
      }}
      placeholder={useTranslation().t('commandBar.prompt')}
      type="text"
      value={currentRefinement}
    />
  </div>
)
