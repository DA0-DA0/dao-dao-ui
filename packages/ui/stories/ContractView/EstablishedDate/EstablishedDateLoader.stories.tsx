import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EstablishedDateLoader } from 'components/ContractView/EstablishedDate'

export default {
  title: 'DAO DAO UI / ContractView / EstablishedDateLoader',
  component: EstablishedDateLoader,
} as ComponentMeta<typeof EstablishedDateLoader>

const Template: ComponentStory<typeof EstablishedDateLoader> = (args) => (
  <EstablishedDateLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {}
