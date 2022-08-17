import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractHeader } from 'components/ContractView/ContractHeader'

export default {
  title: 'DAO DAO UI / ContractView / ContractHeader',
  component: ContractHeader,
} as ComponentMeta<typeof ContractHeader>

const Template: ComponentStory<typeof ContractHeader> = (args) => (
  <ContractHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: null, // TODO: Fill in default value.
  description: null, // TODO: Fill in default value.
  established: null, // TODO: Fill in default value.
}
