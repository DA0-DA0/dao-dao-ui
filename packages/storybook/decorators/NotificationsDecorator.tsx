import { DecoratorFn } from '@storybook/react'

import { ToastNotifications } from '@dao-dao/stateless'

export const NotificationsDecorator: DecoratorFn = (Story) => (
  <>
    <ToastNotifications />
    <Story />
  </>
)
