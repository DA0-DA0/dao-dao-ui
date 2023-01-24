import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BeeEmoji } from './emoji'
import { OptionCard } from './OptionCard'

export default {
  title: 'DAO DAO / packages / stateless / components / OptionCard',
  component: OptionCard,
} as ComponentMeta<typeof OptionCard>

const Template: ComponentStory<typeof OptionCard> = (args) => (
  <OptionCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: BeeEmoji,
  name: 'Bee',
  description:
    'I am a bee. Please select me. I am a bee. Buzz buzz buzzzzzzzzzzzzz.',
}
