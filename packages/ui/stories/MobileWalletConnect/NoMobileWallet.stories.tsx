import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NoMobileWallet } from 'components/MobileWalletConnect'

export default {
  title: 'DAO DAO UI / NoMobileWallet',
  component: NoMobileWallet,
} as ComponentMeta<typeof NoMobileWallet>

const Template: ComponentStory<typeof NoMobileWallet> = (args) => <NoMobileWallet {...args} />

export const Default = Template.bind({})
Default.args = {}
