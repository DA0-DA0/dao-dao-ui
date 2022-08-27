import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConnectedWallet } from 'components/ConnectedWallet'

export default {
  title: 'DAO DAO UI V2 / components / ConnectedWallet',
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
