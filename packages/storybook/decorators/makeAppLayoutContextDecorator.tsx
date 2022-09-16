import { DecoratorFn } from '@storybook/react'
import { useMemo, useState } from 'react'

import { AppLayoutContext } from '@dao-dao/ui/components/layout/AppLayoutContext'

// Useful when testing individual components that rely on this context value but
// don't want to render the entire AppLayout.
export const makeAppLayoutContextDecorator: (
  defaultResponsiveEnabled?: boolean
) => DecoratorFn = (defaultResponsiveEnabled = false) =>
  function ResponsiveNavigationContextDecorator(Story) {
    const [responsiveEnabled, setResponsiveEnabled] = useState(
      defaultResponsiveEnabled
    )

    return (
      <AppLayoutContext.Provider
        value={useMemo(
          () => ({
            responsiveNavigation: {
              enabled: responsiveEnabled,
              toggle: () => setResponsiveEnabled((v) => !v),
            },
            RightSidebarContent: () => null,
          }),
          [responsiveEnabled]
        )}
      >
        <Story />
      </AppLayoutContext.Provider>
    )
  }
