import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractHeaderLoader } from 'components/ContractView/ContractHeader'

export default {
  title: 'DAO DAO UI / ContractView / ContractHeaderLoader',
  component: ContractHeaderLoader,
} as ComponentMeta<typeof ContractHeaderLoader>

const Template: ComponentStory<typeof ContractHeaderLoader> = (args) => (
  <ContractHeaderLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {}
