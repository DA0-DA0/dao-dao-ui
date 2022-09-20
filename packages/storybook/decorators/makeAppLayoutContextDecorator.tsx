import { DecoratorFn } from '@storybook/react'
import { useMemo, useState } from 'react'

import { AppLayoutContext } from '@dao-dao/ui/components/layout/AppLayoutContext'

// Useful when testing individual components that rely on this context value but
// don't want to render the entire AppLayout.
export const makeAppLayoutContextDecorator: (
  defaultResponsiveEnabled?: boolean
) => DecoratorFn = (defaultResponsiveEnabled = false) =>
  function ResponsiveNavigationContextDecorator(Story) {
    const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
      useState(false)
    const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
      useState(false)

    return (
      <AppLayoutContext.Provider
        value={useMemo(
          () => ({
            responsiveNavigation: {
              enabled: responsiveNavigationEnabled,
              toggle: () => setResponsiveNavigationEnabled((v) => !v),
            },
            responsiveRightSidebar: {
              enabled: responsiveRightSidebarEnabled,
              toggle: () => setResponsiveRightSidebarEnabled((v) => !v),
            },
            RightSidebarContent: () => null,
          }),
          [responsiveNavigationEnabled, responsiveRightSidebarEnabled]
        )}
      >
        <Story />
      </AppLayoutContext.Provider>
    )
  }
