import { LinkIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HeroStatLink } from 'components/HeroStat'

export default {
  title: 'DAO DAO UI / components / HeroStatLink',
  component: HeroStatLink,
} as ComponentMeta<typeof HeroStatLink>

const Template: ComponentStory<typeof HeroStatLink> = (args) => (
  <HeroStatLink {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: LinkIcon,
  title: 'Title',
  value: '#',
}
