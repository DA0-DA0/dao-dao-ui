import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConnectWallet } from 'components/wallet/ConnectWallet'

export default {
  title: 'DAO DAO UI V2 / components / wallet / ConnectWallet',
  component: ConnectWallet,
} as ComponentMeta<typeof ConnectWallet>

const Template: ComponentStory<typeof ConnectWallet> = (args) => (
  <ConnectWallet {...args} />
)

export const Default = Template.bind({})
Default.args = {}
