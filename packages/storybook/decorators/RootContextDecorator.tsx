import { DecoratorFn } from '@storybook/react'

import { RootContext } from '@dao-dao/stateless'
import { DaoPageMode } from '@dao-dao/types'

export const RootContextDecorator: DecoratorFn = (Story) => (
  <RootContext.Provider
    value={{
      mode: DaoPageMode.Dapp,
    }}
  >
    <Story />
  </RootContext.Provider>
)
