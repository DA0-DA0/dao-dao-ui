import { wallets as keplrWallets } from '@cosmos-kit/keplr-extension'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConnectedWallet } from './ConnectedWallet'

export default {
  title:
    'DAO DAO / packages / stateless / components / wallet / ConnectedWallet',
  component: ConnectedWallet,
} as ComponentMeta<typeof ConnectedWallet>

const Template: ComponentStory<typeof ConnectedWallet> = (args) => (
  <ConnectedWallet {...args} />
)

export const Default = Template.bind({})
Default.args = {
  wallet: keplrWallets[0].walletInfo,
  walletAddress: 'juno123abx789xyz',
}
