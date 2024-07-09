import { DecoratorFn } from '@storybook/react'

import { mountedInBrowserAtom } from '@dao-dao/state'
import { StateProvider } from '@dao-dao/stateful'

export const StateDecorator: DecoratorFn = (Story) => (
  <StateProvider
    recoilStateInitializer={({ set }) => {
      set(mountedInBrowserAtom, true)
    }}
  >
    <Story />
  </StateProvider>
)
