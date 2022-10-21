import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NoMobileWallet } from './NoMobileWallet'

export default {
  title: 'DAO DAO / packages / stateless / components / wallet / NoMobileWallet',
  component: NoMobileWallet,
} as ComponentMeta<typeof NoMobileWallet>

const Template: ComponentStory<typeof NoMobileWallet> = (args) => (
  <NoMobileWallet {...args} />
)

export const Default = Template.bind({})
Default.args = {}
