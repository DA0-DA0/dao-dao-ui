import { DecoratorFn } from '@storybook/react'

import { DaoProviders } from '@dao-dao/stateful'
import { DaoInfo } from '@dao-dao/types'

export const makeDaoProvidersDecorator = (info: DaoInfo): DecoratorFn =>
  function DaoActionsProviderDecorator(Story) {
    return (
      <DaoProviders info={info}>
        <Story />
      </DaoProviders>
    )
  }
