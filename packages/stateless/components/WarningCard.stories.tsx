import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WarningCard } from './WarningCard'

export default {
  title: 'DAO DAO / packages / stateless / components / WarningCard',
  component: WarningCard,
} as ComponentMeta<typeof WarningCard>

const Template: ComponentStory<typeof WarningCard> = (args) => (
  <WarningCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  content: 'This is a warning.',
}
