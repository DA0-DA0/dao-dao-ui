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
  data: {
    loading: false,
    data: {
      walletName: '@Modern-Edamame',
      walletAddress: 'juno123abx789xyz',
      tokenBalance: {
        loading: false,
        data: 2400.111111,
      },
    },
  },
  tokenDecimals: 6,
  tokenSymbol: 'JUNO',
  openWalletModal: () => alert('open'),
}

export const Loading = Template.bind({})
Loading.args = {
  data: {
    loading: true,
  },
  tokenDecimals: 6,
  tokenSymbol: 'JUNO',
  openWalletModal: () => alert('open'),
}
