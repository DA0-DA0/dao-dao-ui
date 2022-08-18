// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import clsx from 'clsx'
import { ReactNode } from 'react'

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

export const CreateDAOStructure = ({
  newDAO,
  emoji,
  title,
  description,
  structure,
  onChange,
}: CreateDAOStructureProps) => {
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
