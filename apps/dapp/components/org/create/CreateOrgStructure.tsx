import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { RadioButton } from '@dao-dao/ui'

import { NewOrg, NewOrgStructure } from '@/atoms/newOrg'

interface CreateOrgStructureProps {
  newOrg: NewOrg
  emoji: ReactNode
  title: string
  description: string
  structure: NewOrgStructure
  setValue: UseFormSetValue<NewOrg>
}

export const CreateOrgStructure: FC<CreateOrgStructureProps> = ({
  newOrg,
  emoji,
  title,
  description,
  structure,
  setValue,
}) => {
  const selected = newOrg.structure === structure

  return (
    <div
      className={clsx(
        'flex basis-0 flex-col grow gap-6 items-center p-8 text-center rounded-lg border-2 transition cursor-pointer',
        {
          'bg-disabled border-transparent': !selected,
          'bg-brand-active border-focus': selected,
        }
      )}
      onClick={() => setValue('structure', structure)}
    >
      {emoji}
      <p className="header-text">{title}</p>

      <div className="flex flex-col grow gap-6 justify-end items-center">
        <p className="secondary-text">{description}</p>
        <RadioButton selected={selected} />
      </div>
    </div>
  )
}
