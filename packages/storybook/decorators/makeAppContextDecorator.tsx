import { DecoratorFn } from '@storybook/react'
import { useRef, useState } from 'react'

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
    const pageHeaderRef = useRef<HTMLDivElement | null>(null)

    return (
      <AppContext.Provider
        value={{
          mode: DaoPageMode.Dapp,
          responsiveNavigation: {
            enabled: responsiveNavigationEnabled,
            toggle: () => setResponsiveNavigationEnabled((v) => !v),
          },
          pageHeaderRef,
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
