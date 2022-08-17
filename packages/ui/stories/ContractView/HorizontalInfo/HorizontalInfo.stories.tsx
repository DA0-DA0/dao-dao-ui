import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HorizontalInfo } from 'components/ContractView/HorizontalInfo'

export default {
  title: 'DAO DAO UI / ContractView / HorizontalInfo',
  component: HorizontalInfo,
} as ComponentMeta<typeof HorizontalInfo>

const Template: ComponentStory<typeof HorizontalInfo> = (args) => <HorizontalInfo {...args} />

export const Default = Template.bind({})
Default.args = {}
