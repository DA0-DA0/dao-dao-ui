import { InformationCircleIcon } from '@heroicons/react/solid'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HeroStat } from 'components/HeroStat'

export default {
  title: 'DAO DAO UI / components / HeroStat',
  component: HeroStat,
} as ComponentMeta<typeof HeroStat>

const Template: ComponentStory<typeof HeroStat> = (args) => (
  <HeroStat {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: InformationCircleIcon,
  title: 'Title',
  value: 'Value',
}
