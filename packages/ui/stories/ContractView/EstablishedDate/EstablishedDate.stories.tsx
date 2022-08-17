import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EstablishedDate } from 'components/ContractView/EstablishedDate'

export default {
  title: 'DAO DAO UI / ContractView / EstablishedDate',
  component: EstablishedDate,
} as ComponentMeta<typeof EstablishedDate>

const Template: ComponentStory<typeof EstablishedDate> = (args) => (
  <EstablishedDate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  date: null, // TODO: Fill in default value.
}
