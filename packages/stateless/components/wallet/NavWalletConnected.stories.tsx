import { wallets as keplrWallets } from '@cosmos-kit/keplr-extension'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NavWalletConnected } from './NavWalletConnected'

export default {
  title:
    'DAO DAO / packages / stateless / components / wallet / NavWalletConnected',
  component: NavWalletConnected,
} as ComponentMeta<typeof NavWalletConnected>

const Template: ComponentStory<typeof NavWalletConnected> = (args) => (
  <NavWalletConnected {...args} />
)

export const Default = Template.bind({})
Default.args = {
  wallet: keplrWallets[0].walletInfo,
  walletAddress: 'juno123abx789xyz',
}
