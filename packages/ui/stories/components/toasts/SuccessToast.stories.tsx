import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SuccessToast } from 'components/toasts/SuccessToast'

export default {
  title: 'DAO DAO UI / components / toasts / SuccessToast',
  component: SuccessToast,
} as ComponentMeta<typeof SuccessToast>

const Template: ComponentStory<typeof SuccessToast> = (args) => (
  <SuccessToast {...args} />
)

export const Default = Template.bind({})
Default.args = {
  toast: {
    type: 'success',
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
