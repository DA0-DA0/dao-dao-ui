import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HeroStatLink } from 'components/HeroStat'

export default {
  title: 'DAO DAO UI / HeroStatLink',
  component: HeroStatLink,
} as ComponentMeta<typeof HeroStatLink>

const Template: ComponentStory<typeof HeroStatLink> = (args) => (
  <HeroStatLink {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: null, // TODO: Fill in default value.
  title: null, // TODO: Fill in default value.
  value: null, // TODO: Fill in default value.
}
