import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SearchBar } from '@dao-dao/ui'

interface CommandBarProps {
  currentRefinement: string
  refine: (s: string) => void
  onEmptyBack: () => void
}

export const CommandBar: FC<CommandBarProps> = ({
  currentRefinement,
  refine,
  onEmptyBack,
}) => {
  const { t } = useTranslation()

  return (
    <SearchBar
      className="px-2"
      hideIcon
      onBlur={(ev) => ev.target.focus()}
      onChange={(event) => refine(event.currentTarget.value)}
      onKeyDown={(ev) => {
        if (ev.key == 'ArrowUp' || ev.key == 'ArrowDown')
          return ev.preventDefault()
        else if (currentRefinement == '' && ev.key == 'Backspace')
          return onEmptyBack()
      }}
      placeholder={t('commandBar.prompt')}
      value={currentRefinement}
    />
  )
}
