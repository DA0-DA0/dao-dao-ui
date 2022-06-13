import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import { RadioButton } from '@dao-dao/ui'

import { NewDAO, NewDAOStructure } from '@/atoms'

interface CreateDAOStructureProps {
  newDAO: NewDAO
  emoji: ReactNode
  title: string
  description: string
  structure: NewDAOStructure
  onChange: (structure: NewDAOStructure) => void
}

export const CreateDAOStructure: FC<CreateDAOStructureProps> = ({
  newDAO,
  emoji,
  title,
  description,
  structure,
  onChange,
}) => {
  const selected = newDAO.structure === structure

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
