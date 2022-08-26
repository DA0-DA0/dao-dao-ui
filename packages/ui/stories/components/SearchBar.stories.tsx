import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SearchBar } from 'components/SearchBar'

export default {
  title: 'DAO DAO UI / components / SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
)

export const Default = Template.bind({})
Default.args = {}
