import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LoadingToast } from 'components/toasts/LoadingToast'

export default {
  title: 'DAO DAO UI / toasts / LoadingToast',
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
