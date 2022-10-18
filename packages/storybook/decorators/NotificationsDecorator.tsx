import { DecoratorFn } from '@storybook/react'

import { Notifications } from '@dao-dao/ui'

export const NotificationsDecorator: DecoratorFn = (Story) => (
  <>
    <Notifications />
    <Story />
  </>
)
