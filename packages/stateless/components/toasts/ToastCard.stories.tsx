import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ToastCard } from './ToastCard'

export default {
  title: 'DAO DAO / packages / stateless / components / toasts / ToastCard',
  component: ToastCard,
} as ComponentMeta<typeof ToastCard>

const Template: ComponentStory<typeof ToastCard> = (args) => (
  <ToastCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
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
    height: 1,
  },
}
