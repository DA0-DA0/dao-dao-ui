import {
  CommandModalContextMaker,
  CommandModalContextUseSections,
  CommandModalDaoInfo,
} from '@dao-dao/types'

import { makeGenericContext } from './generic'
import { makeGenericDaoContext } from './generic/dao'

// Makes DAO context for use on DAO pages.
export const makeDaoContext: CommandModalContextMaker<{
  dao: CommandModalDaoInfo
}> = (options) => {
  const genericContext = makeGenericContext(options)
  const genericDaoContext = makeGenericDaoContext({
    ...options,
    onDaoPage: true,
  })

  const useSections: CommandModalContextUseSections = (sectionOptions) => {
    const genericSections = genericContext.useSections(sectionOptions)
    const daoSections = genericDaoContext.useSections(sectionOptions)

    return [...daoSections, ...genericSections]
  }

  return {
    name: options.dao.name,
    imageUrl: options.dao.imageUrl,
    useSections,
    Wrapper: genericDaoContext.Wrapper,
  }
}
