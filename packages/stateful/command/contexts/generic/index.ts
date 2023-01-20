import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalContextUseSections,
  CommandModalDaoInfo,
} from '@dao-dao/types'

import {
  useFollowingAndFilteredDaosSections,
  useNavigationSection,
} from '../../hooks'
import { makeGenericDaoContext } from './dao'

// Makes generic context for use on basic pages, like home and inbox. Other
// pages have more specific options (like voting on a proposal).
export const makeGenericContext: CommandModalContextMaker = (options) => {
  const useSections: CommandModalContextUseSections = (sectionOptions) => {
    // Open generic DAO context on click.
    const onChooseDao: CommandModalContextSection<CommandModalDaoInfo>['onChoose'] =
      (dao) =>
        options.openContext(
          makeGenericDaoContext({
            ...options,
            dao,
          })
        )

    const navigationSection = useNavigationSection()

    const followingAndFilteredDaosSections =
      useFollowingAndFilteredDaosSections({
        options: sectionOptions,
        onChoose: onChooseDao,
      })

    return [navigationSection, ...followingAndFilteredDaosSections]
  }

  return {
    // Not shown.
    name: 'Root',
    useSections,
  }
}
