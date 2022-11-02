import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ErrorToast } from './ErrorToast'

export default {
  title: 'DAO DAO / packages / stateless / components / toasts / ErrorToast',
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
    message: 'Test error toast',
    pauseDuration: 0,
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
    createdAt: Date.now(),
    visible: true,
    height: 1,
  },
}
