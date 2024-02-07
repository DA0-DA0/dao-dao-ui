import {
  CommandModalContextMaker,
  CommandModalContextUseSections,
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
    const navigationSection = useNavigationSection()

    const followingAndFilteredDaosSections =
      useFollowingAndFilteredDaosSections({
        options: sectionOptions,
        // Open generic DAO context on click.
        onChoose: (dao) =>
          options.openContext(
            makeGenericDaoContext({
              ...options,
              dao,
            })
          ),
      })

    return [navigationSection, ...followingAndFilteredDaosSections]
  }

  return {
    // Not shown.
    name: 'Root',
    useSections,
  }
}
