import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MobileHeaderLoader } from 'components/ContractView/MobileHeader'

export default {
  title: 'DAO DAO UI / components / ContractView / MobileHeaderLoader',
  component: MobileHeaderLoader,
} as ComponentMeta<typeof MobileHeaderLoader>

const Template: ComponentStory<typeof MobileHeaderLoader> = (args) => (
  <MobileHeaderLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  contractAddress: 'junoabcdefxyz',
}
