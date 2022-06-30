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
        'flex grow basis-0 cursor-pointer flex-col items-center justify-between rounded-lg border-2 p-9 text-center transition',
        {
          'border-transparent bg-disabled hover:border-focus': !selected,
          'border-focus bg-brand-active': selected,
        }
      )}
      onClick={() => onChange(structure)}
    >
      <div>
        {emoji}
        <p className="primary-text mt-6">{title}</p>

        <p className="secondary-text mt-4">{description}</p>
      </div>

      <div className="mt-10">
        <RadioButton selected={selected} />
      </div>
    </div>
  )
}
