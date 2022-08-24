import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ToastCard } from 'components/toasts/ToastCard'

export default {
  title: 'DAO DAO UI / toasts / ToastCard',
  component: ToastCard,
} as ComponentMeta<typeof ToastCard>

const Template: ComponentStory<typeof ToastCard> = (args) => (
  <ToastCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  containerClassName: 'text-light bg-dark',
  toast: {
    type: 'blank',
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
