import { DecoratorFn } from '@storybook/react'
import { useMemo, useState } from 'react'

import { AppLayoutContext } from '@dao-dao/stateless/components/layout/AppLayoutContext'
import { DaoPageMode, InboxState } from '@dao-dao/types'

// Useful when testing individual components that rely on this context value but
// don't want to render the entire AppLayout.
export const makeAppLayoutContextDecorator: (
  defaultResponsiveEnabled?: boolean
) => DecoratorFn = (defaultResponsiveEnabled = false) =>
  function ResponsiveNavigationContextDecorator(Story) {
    const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
      useState(defaultResponsiveEnabled)
    const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
      useState(false)
    const [updateProfileVisible, setUpdateProfileVisible] = useState(false)

    return (
      <AppLayoutContext.Provider
        value={useMemo(
          () => ({
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
            RightSidebarContent: () => null,
            setRootCommandContextMaker: () => {},
            inbox: EMPTY_INBOX,
          }),
          [
            responsiveNavigationEnabled,
            responsiveRightSidebarEnabled,
            updateProfileVisible,
          ]
        )}
      >
        <Story />
      </AppLayoutContext.Provider>
    )
  }

export const EMPTY_INBOX: InboxState = {
  loading: false,
  refreshing: false,
  daosWithItems: [],
  itemCount: 0,
  refresh: async () => alert('refetch inbox'),
}
