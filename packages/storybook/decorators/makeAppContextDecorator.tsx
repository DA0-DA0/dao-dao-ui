import { DecoratorFn } from '@storybook/react'
import { useState } from 'react'

import { makeGenericContext } from '@dao-dao/stateful/command'
import { AppContext } from '@dao-dao/stateless'
import { DaoPageMode, DaoWebSocket, InboxState } from '@dao-dao/types'

// Useful when testing individual components that rely on this context value but
// don't want to render the entire AppLayout.
export const makeAppContextDecorator: (
  defaultResponsiveEnabled?: boolean
) => DecoratorFn = (defaultResponsiveEnabled = false) =>
  function ResponsiveNavigationContextDecorator(Story) {
    const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
      useState(defaultResponsiveEnabled)
    const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
      useState(false)
    const [updateProfileVisible, setUpdateProfileVisible] = useState(false)

    return (
      <AppContext.Provider
        value={{
          mode: DaoPageMode.Dapp,
          responsiveNavigation: {
            enabled: responsiveNavigationEnabled,
            toggle: () => setResponsiveNavigationEnabled((v) => !v),
          },
          responsiveRightSidebar: {
            enabled: responsiveRightSidebarEnabled,
            toggle: () => setResponsiveRightSidebarEnabled((v) => !v),
          },
          updateProfileNft: {
            visible: updateProfileVisible,
            toggle: () => setUpdateProfileVisible((v) => !v),
          },
          PageHeader: () => null,
          setPageHeaderRef: () => {},
          RightSidebarContent: () => null,
          setRightSidebarContentRef: () => {},
          rootCommandContextMaker: makeGenericContext,
          setRootCommandContextMaker: () => {},
          inbox: EMPTY_INBOX,
          daoWebSocket: EMPTY_DAO_WEB_SOCKET,
        }}
      >
        <Story />
      </AppContext.Provider>
    )
  }

export const EMPTY_INBOX: InboxState = {
  loading: false,
  refreshing: false,
  daosWithItems: [],
  itemCount: 0,
  refresh: async () => alert('refetch inbox'),
}

export const EMPTY_DAO_WEB_SOCKET: DaoWebSocket = {
  connected: false,
  channel: null,
  connect: () => alert('connect'),
  disconnect: () => alert('disconnect'),
}
