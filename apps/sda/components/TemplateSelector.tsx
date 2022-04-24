import { Modal } from '@dao-dao/ui'
import { Template } from '@dao-dao/ui/components/templates'
import { XIcon } from '@heroicons/react/outline'

import { templates } from './templates'

export const TemplateDisplayItem = ({
  template,
  onClick,
}: {
  template: Template
  onClick: () => void
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

interface TemplateSelectorProps {
  onClose: () => void
  onSelectTemplate: (template: Template) => void
}

export const TemplateSelector = ({
  onClose,
  onSelectTemplate,
}: TemplateSelectorProps) => (
  <Modal onClose={onClose}>
    <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus cursor-auto">
      <button
        className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
        onClick={onClose}
        type="button"
      >
        <XIcon className="w-4 h-4" />
      </button>
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
    </div>
  </Modal>
)
