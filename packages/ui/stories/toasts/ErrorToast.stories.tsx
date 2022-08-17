import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ErrorToast } from 'components/toasts/ErrorToast'

export default {
  title: 'DAO DAO UI / toasts / ErrorToast',
  component: ErrorToast,
} as ComponentMeta<typeof ErrorToast>

const Template: ComponentStory<typeof ErrorToast> = (args) => (
  <ErrorToast {...args} />
)

export const Default = Template.bind({})
Default.args = {
  toast: {
    type: 'error',
    id: 'toast',
    message: 'Test toast',
    pauseDuration: 0,
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
    createdAt: Date.now(),
    visible: true,
  },
}
