import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SuccessToast } from './SuccessToast'

export default {
  title: 'DAO DAO / packages / ui / components / toasts / SuccessToast',
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
    message:
      'This is a really really successful toast. This toast launched its own great DAO, swapped for some $DAO token, and built a great community doing awesome work.',
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
