import { ComponentType } from 'react'

import { DaoHeader } from '@dao-dao/stateless'
import {
  ActionComponent,
  DaoParentInfo,
  LinkWrapperProps,
} from '@dao-dao/types'

export type CreateDaoData = {
  admin?: string | null
  name: string
  description: string
  imageUrl?: string
}

export type CreateDaoOptions = {
  // Defined if admin is set to a DAO.
  parentDao?: DaoParentInfo

  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const CreateDaoComponent: ActionComponent<
  CreateDaoOptions,
  CreateDaoData
> = ({ data, options: { parentDao, LinkWrapper } }) => (
  <DaoHeader
    {...data}
    LinkWrapper={LinkWrapper}
    className="flex-col justify-center items-center gap-4 mt-4 mb-2"
    parentDao={parentDao}
  />
)
