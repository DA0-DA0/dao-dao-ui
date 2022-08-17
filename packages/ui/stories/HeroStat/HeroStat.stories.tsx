import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HeroStat } from 'components/HeroStat'

export default {
  title: 'DAO DAO UI / HeroStat',
  component: HeroStat,
} as ComponentMeta<typeof HeroStat>

const Template: ComponentStory<typeof HeroStat> = (args) => (
  <HeroStat {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: null, // TODO: Fill in default value.
  title: null, // TODO: Fill in default value.
  value: null, // TODO: Fill in default value.
}
