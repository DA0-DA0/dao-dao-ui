import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HorizontalNftCard } from './HorizontalNftCard'
import { makeProps } from './NftCard.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / HorizontalNftCard',
  component: HorizontalNftCard,
} as ComponentMeta<typeof HorizontalNftCard>

const Template: ComponentStory<typeof HorizontalNftCard> = (args) => (
  <HorizontalNftCard {...args} />
)

export const Default = Template.bind({})
Default.args = makeProps()
