import { DecoratorFn } from '@storybook/react'
import { useCallback, useRef, useState } from 'react'

import { makeGenericContext } from '@dao-dao/stateful/command'
import { AppContext } from '@dao-dao/stateless'
import { DaoPageMode, InboxState } from '@dao-dao/types'

// Useful when testing individual components that rely on this context value but
// don't want to render the entire AppLayout.
export const makeAppContextDecorator: (
  defaultResponsiveEnabled?: boolean
) => DecoratorFn = (defaultResponsiveEnabled = false) =>
  function ResponsiveNavigationContextDecorator(Story) {
    const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
      useState(defaultResponsiveEnabled)

    // Page header.
    const [, setPageHeaderSet] = useState(false)
    const pageHeaderRef = useRef<HTMLDivElement | null>(null)
    const setPageHeaderRef = useCallback((ref: HTMLDivElement | null) => {
      if (ref) {
        pageHeaderRef.current = ref
        setPageHeaderSet(true)
      }
    }, [])

    return (
      <AppContext.Provider
        value={{
          mode: DaoPageMode.Dapp,
          responsiveNavigation: {
            enabled: responsiveNavigationEnabled,
            toggle: () => setResponsiveNavigationEnabled((v) => !v),
          },
          pageHeaderRef,
          setPageHeaderRef,
          rootCommandContextMaker: makeGenericContext,
          setRootCommandContextMaker: () => {},
          inbox: EMPTY_INBOX,
        }}
      >
        <Story />
      </AppContext.Provider>
    )
  }

export const EMPTY_INBOX: InboxState = {
  loading: false,
  refreshing: false,
  items: [],
  refresh: async () => alert('refetch inbox'),
}
