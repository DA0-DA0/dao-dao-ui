import clsx from 'clsx'
import Fuse from 'fuse.js'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Modal, SearchBar } from '@dao-dao/ui'
import { VotingModuleType } from '@dao-dao/utils'

import { Action, useActionsForVotingModuleType } from '..'

export interface ActionSelectorProps {
  onClose: () => void
  onSelectAction: (action: Action) => void
  votingModuleType: VotingModuleType
}

export const ActionSelector: FC<ActionSelectorProps> = ({
  onClose,
  onSelectAction,
  votingModuleType,
}) => {
  const { t } = useTranslation()
  const actions = useActionsForVotingModuleType(votingModuleType)
  const actionsFuse = useMemo(
    () => new Fuse(actions, { keys: ['label', 'description'] }),
    [actions]
  )

  const [filter, setFilter] = useState('')
  const filteredActions = useMemo(
    () =>
      filter ? actionsFuse.search(filter).map(({ item }) => item) : actions,
    [actions, actionsFuse, filter]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  // When filtered actions update, reset selection to top.
  useEffect(() => setSelectedIndex(0), [filteredActions])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((index) =>
            index - 1 < 0
              ? filteredActions.length - 1
              : // Just in case for some reason the index is overflowing.
                Math.min(index - 1, filteredActions.length - 1)
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % filteredActions.length
          )
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < filteredActions.length) {
            onSelectAction(filteredActions[selectedIndex])
          }
          break
      }
    },
    [selectedIndex, filteredActions, onSelectAction]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    // Clean up event listener on unmount.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <Modal
      containerClassName="max-w-[96vw] w-[32rem] h-[38rem] max-h-[96vh] flex flex-col gap-2"
      onClose={onClose}
    >
      <SearchBar
        onChange={(event) => setFilter(event.target.value)}
        placeholder={t('searchProposalActions')}
        value={filter}
      />

      <ul className="flex overflow-y-auto flex-col grow gap-3 list-none">
        {filteredActions.map((action, index) => (
          <li key={action.key}>
            <ActionDisplayItem
              action={action}
              onClick={() => onSelectAction(action)}
              selected={selectedIndex === index}
            />
          </li>
        ))}
      </ul>
    </Modal>
  )
}

interface ActionDisplayItemProps {
  action: Action
  onClick: () => void
  selected: boolean
}

const ActionDisplayItem: FC<ActionDisplayItemProps> = ({
  action,
  onClick,
  selected,
}) => {
  const words = action.label.split(' ')

  const icon = words[0]
  words.shift()
  const label = words.join(' ')
  const description = action.description

  return (
    <button
      className={clsx(
        'flex flex-row gap-3 items-center p-2 w-full text-left hover:bg-primary rounded transition',
        { 'bg-primary': selected }
      )}
      onClick={onClick}
      type="button"
    >
      <p className="text-3xl">{icon}</p>
      <div className="flex flex-col items-start">
        <p className="body-text">{label}</p>
        <p className="secondary-text">{description}</p>
      </div>
    </button>
  )
}
