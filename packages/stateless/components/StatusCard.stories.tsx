import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StatusCard } from './StatusCard'

export default {
  title: 'DAO DAO / packages / stateless / components / StatusCard',
  component: StatusCard,
} as ComponentMeta<typeof StatusCard>

const Template: ComponentStory<typeof StatusCard> = (args) => (
  <StatusCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  content: 'This is a warning.',
}
