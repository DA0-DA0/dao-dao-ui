import { useSetRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state/recoil'
import { useDaoNavHelpers, useHoldingKey } from '@dao-dao/stateless'
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
    const holdingAlt = useHoldingKey({ key: 'alt' })
    const { getDaoPath, router } = useDaoNavHelpers()
    const setNavigatingToHref = useSetRecoilState(navigatingToHrefAtom)

    const followingAndFilteredDaosSections =
      useFollowingAndFilteredDaosSections({
        options: sectionOptions,
        // Open generic DAO context on click.
        onChoose: (dao) => {
          // Open advanced context menu.
          if (holdingAlt) {
            options.openContext(
              makeGenericDaoContext({
                ...options,
                dao,
              })
            )
          } else {
            // Go to DAO page.
            const href = getDaoPath(dao.coreAddress)
            router.push(href)

            // If not on destination page, set navigating state. If already
            // there, do nothing.
            if (router.asPath !== href) {
              setNavigatingToHref(href)
            }
          }
        },
      })

    return [navigationSection, ...followingAndFilteredDaosSections]
  }

  return {
    // Not shown.
    name: 'Root',
    useSections,
  }
}
