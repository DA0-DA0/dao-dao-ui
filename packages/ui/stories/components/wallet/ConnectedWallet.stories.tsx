import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConnectedWallet } from 'components/wallet/ConnectedWallet'

export default {
  title: 'DAO DAO V2 / components / wallet / ConnectedWallet',
  component: ConnectedWallet,
} as ComponentMeta<typeof ConnectedWallet>

const Template: ComponentStory<typeof ConnectedWallet> = (args) => (
  <ConnectedWallet {...args} />
)

export const Default = Template.bind({})
Default.args = {
  walletName: '@Modern-Edamame',
  walletAddress: 'juno123abx789xyz',
  tokenBalance: 2400.111111,
  tokenSymbol: 'JUNO',
}
