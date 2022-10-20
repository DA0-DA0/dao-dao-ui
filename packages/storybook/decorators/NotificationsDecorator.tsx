import { DecoratorFn } from '@storybook/react'

import { ToastNotifications } from '@dao-dao/ui'

export const NotificationsDecorator: DecoratorFn = (Story) => (
  <>
    <ToastNotifications />
    <Story />
  </>
)
