import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileDisplay } from '@dao-dao/stateful'
import { TokenSwapStatusProps } from '@dao-dao/types'

import { TokenSwapStatus } from './TokenSwapStatus'

export default {
  title: 'DAO DAO / packages / stateless / components / TokenSwapStatus',
  component: TokenSwapStatus,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof TokenSwapStatus>

const Template: ComponentStory<typeof TokenSwapStatus> = (args) => (
  <TokenSwapStatus {...args} />
)

export const makeProps = (): TokenSwapStatusProps => ({
  selfParty: {
    address: 'juno1qrmk7202w7c6lwmykkr420j6wrrntt8wwzsrqvdtdv64xrtkrs5sn57s0l',
    amount: 420000,
    decimals: 6,
    symbol: 'JUNO',
    tokenLogoUrl: '/juno-symbol.png',
    provided: true,
  },
  counterparty: {
    address: 'juno16fphqmlz42t6k2u6qxchueut78cagflw40rsk5j3hkv4kxenyw2q04cwl3',
    amount: 1100002.7,
    decimals: 6,
    symbol: 'DAO',
    tokenLogoUrl: '/daodao.png',
    provided: false,
  },

  ProfileDisplay,
})

export const Default = Template.bind({})
Default.args = makeProps()
