import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state/recoil'

// This hook abstracts away the logic of updating the global URL navigation
// loading state which is used by stateful components to indicate when a
// navigation event is occurring.
export const useUpdateNavigatingHref = () => {
  const router = useRouter()
  const [navigatingToHref, setNavigatingToHref] =
    useRecoilState(navigatingToHrefAtom)

  const updateNavigatingHref = useCallback(
    (href: string | undefined) => {
      // If not on destination page, set navigating state. If already there or
      // href is invalid, do nothing.
      if (
        href &&
        router.asPath !== href &&
        // Don't set navigating if remote.
        !href.startsWith('http')
      ) {
        setNavigatingToHref(href)
      }
    },
    [router.asPath, setNavigatingToHref]
  )

  return {
    navigatingToHref,
    updateNavigatingHref,
  }
}
