import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Votes } from '@dao-dao/icons'

import { GovInfoListItem } from 'components/ContractView/GovInfoListItem'

export default {
  title: 'DAO DAO UI / ContractView / GovInfoListItem',
  component: GovInfoListItem,
} as ComponentMeta<typeof GovInfoListItem>

const Template: ComponentStory<typeof GovInfoListItem> = (args) => (
  <GovInfoListItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: <Votes width="1rem" />,
  text: 'Passing threshold',
  value: '75%',
}
