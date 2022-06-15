import { FC } from 'react'

import { Modal } from '@dao-dao/ui'
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
  const actions = useActionsForVotingModuleType(votingModuleType)

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="header-text">Proposal actions</h1>
      </div>
      <ul className="flex flex-col gap-3 list-none">
        {actions.map((action, index) => (
          <li key={index}>
            <ActionDisplayItem
              action={action}
              onClick={() => onSelectAction(action)}
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
}

const ActionDisplayItem: FC<ActionDisplayItemProps> = ({ action, onClick }) => {
  const words = action.label.split(' ')

  const icon = words[0]
  words.shift()
  const label = words.join(' ')
  const description = action.description

  return (
    <button
      className="flex flex-row gap-3 items-center p-2 w-full hover:bg-primary rounded transition"
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
