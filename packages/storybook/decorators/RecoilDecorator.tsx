import { DecoratorFn } from '@storybook/react'
import { RecoilRoot } from 'recoil'

import { mountedInBrowserAtom } from '@dao-dao/state'

export const RecoilDecorator: DecoratorFn = (Story) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(mountedInBrowserAtom, true)
    }}
  >
    <Story />
  </RecoilRoot>
)
