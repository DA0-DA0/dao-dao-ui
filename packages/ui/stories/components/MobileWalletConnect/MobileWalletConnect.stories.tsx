import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MobileWalletConnect } from 'components/MobileWalletConnect'

export default {
  title: 'DAO DAO UI / components / MobileWalletConnect',
  component: MobileWalletConnect,
} as ComponentMeta<typeof MobileWalletConnect>

const Template: ComponentStory<typeof MobileWalletConnect> = (args) => (
  <MobileWalletConnect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  connected: false,
  walletBalanceDenom: 'DENOM',
}
