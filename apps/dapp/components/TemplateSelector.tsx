import { XIcon } from '@heroicons/react/outline'

import { ContractSupport, MessageTemplate } from 'templates/templateList'
import { Config } from 'util/contractConfigWrapper'

import { Modal } from './Modal'

export function MessageTemplateDisplayItem({
  template,
  onClick,
}: {
  template: MessageTemplate
  onClick: () => void
}) {
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

export function ProposalTemplateSelector({
  templates,
  onLabelSelect,
  onClose,
  multisig,
}: {
  templates: MessageTemplate[]
  onLabelSelect: (
    label: string,
    getDefaults: (
      walletAddress: string,
      contractConfig: Config,
      govTokenDecimals: number
    ) => any
  ) => void
  onClose: () => void
  multisig: boolean
}) {
  return (
    <Modal>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
          type="button"
        >
          <XIcon className="w-4 h-4" />
        </button>
        <div className="flex justify-between items-center mb-6">
          <h1 className="header-text">Proposal templates</h1>
        </div>
        <ul className="flex flex-col gap-3 list-none">
          {templates
            .filter(({ contractSupport }) => {
              switch (contractSupport) {
                case ContractSupport.Both:
                  return true
                case ContractSupport.Multisig:
                  return multisig
                case ContractSupport.DAO:
                  return !multisig
              }
            })
            .map((template, index) => (
              <li key={index}>
                <MessageTemplateDisplayItem
                  onClick={() =>
                    onLabelSelect(template.label, template.getDefaults)
                  }
                  template={template}
                />
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  )
}
