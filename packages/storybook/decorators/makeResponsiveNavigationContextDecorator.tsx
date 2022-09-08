import { DecoratorFn } from '@storybook/react'
import { useMemo, useState } from 'react'

import { ResponsiveNavigationContext } from '@dao-dao/ui/components/layout/ResponsiveNavigationContext'

export const makeResponsiveNavigationContextDecorator: (
  defaultEnabled: boolean
) => DecoratorFn = (defaultEnabled) =>
  function ResponsiveNavigationContextDecorator(Story) {
    const [responsiveEnabled, setResponsiveEnabled] = useState(defaultEnabled)

    return (
      <ResponsiveNavigationContext.Provider
        value={useMemo(
          () => ({
            enabled: responsiveEnabled,
            toggle: () => setResponsiveEnabled((v) => !v),
          }),
          [responsiveEnabled]
        )}
      >
        <Story />
      </ResponsiveNavigationContext.Provider>
    )
  }
