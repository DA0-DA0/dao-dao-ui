// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useTranslation } from 'react-i18next'

import { SearchBar } from '@dao-dao/ui'

interface CommandBarProps {
  input: string
  setInput: (s: string) => void
  // Triggered when backspace is pressed and the text field is empty.
  onEmptyBack: () => void
}

export const CommandBar = ({
  input,
  setInput,
  onEmptyBack,
}: CommandBarProps) => {
  const { t } = useTranslation()

  return (
    <SearchBar
      className="px-2"
      hideIcon
      onBlur={(ev) => ev.target.focus()}
      onChange={(event) => setInput(event.currentTarget.value)}
      onKeyDown={(ev) => {
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
          return ev.preventDefault()
        } else if (ev.key === 'Backspace' && !input.length) {
          return onEmptyBack()
        }
      }}
      placeholder={t('commandBar.prompt')}
      value={input}
    />
  )
}
