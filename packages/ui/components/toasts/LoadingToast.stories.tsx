import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LoadingToast } from './LoadingToast'

export default {
  title: '(OLD DAO DAO) / components / toasts / LoadingToast',
  component: LoadingToast,
} as ComponentMeta<typeof LoadingToast>

const Template: ComponentStory<typeof LoadingToast> = (args) => (
  <LoadingToast {...args} />
)

export const Default = Template.bind({})
Default.args = {
  toast: {
    type: 'loading',
    id: 'toast',
    message: 'Doing something...',
    pauseDuration: 0,
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
    createdAt: Date.now(),
    visible: true,
  },
}
