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
  walletProviderImageUrl: '/daodao.png',
  walletName: '@Modern-Edamame',
  walletAddress: 'juno123abx789xyz',
  openWalletModal: () => alert('open'),
}
