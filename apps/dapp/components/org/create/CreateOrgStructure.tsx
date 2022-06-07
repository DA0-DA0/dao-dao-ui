import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import { RadioButton } from '@dao-dao/ui'

import { NewOrg, NewOrgStructure } from '@/atoms/newOrg'

interface CreateOrgStructureProps {
  newOrg: NewOrg
  emoji: ReactNode
  title: string
  description: string
  structure: NewOrgStructure
  onChange: (structure: NewOrgStructure) => void
}

export const CreateOrgStructure: FC<CreateOrgStructureProps> = ({
  newOrg,
  emoji,
  title,
  description,
  structure,
  onChange,
}) => {
  const selected = newOrg.structure === structure

  return (
    <div
      className={clsx(
        'flex basis-0 flex-col grow justify-between items-center p-9 text-center rounded-lg border-2 transition cursor-pointer',
        {
          'bg-disabled border-transparent hover:border-focus': !selected,
          'bg-brand-active border-focus': selected,
        }
      )}
      onClick={() => onChange(structure)}
    >
      <div>
        {emoji}
        <p className="mt-6 primary-text">{title}</p>

        <p className="mt-4 secondary-text">{description}</p>
      </div>

      <div className="mt-10">
        <RadioButton selected={selected} />
      </div>
    </div>
  )
}
