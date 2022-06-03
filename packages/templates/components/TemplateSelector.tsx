import { FC } from 'react'

import { Template, useTemplatesForVotingModuleType } from '@dao-dao/templates'
import { Modal } from '@dao-dao/ui'
import { VotingModuleType } from '@dao-dao/utils'

interface TemplateDisplayItemProps {
  template: Template
  onClick: () => void
}

export const TemplateDisplayItem: FC<TemplateDisplayItemProps> = ({
  template,
  onClick,
}) => {
  const words = template.label.split(' ')

  const icon = words[0]
  words.shift()
  const label = words.join(' ')
  const description = template.description

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

export interface TemplateSelectorProps {
  onClose: () => void
  onSelectTemplate: (template: Template) => void
  votingModuleType: VotingModuleType
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({
  onClose,
  onSelectTemplate,
  votingModuleType,
}) => {
  const templates = useTemplatesForVotingModuleType(votingModuleType)

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="header-text">Proposal message templates</h1>
      </div>
      <ul className="flex flex-col gap-3 list-none">
        {templates.map((template, index) => (
          <li key={index}>
            <TemplateDisplayItem
              onClick={() => onSelectTemplate(template)}
              template={template}
            />
          </li>
        ))}
      </ul>
    </Modal>
  )
}
