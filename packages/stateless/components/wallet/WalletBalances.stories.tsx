import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink, IconButtonLink, WalletTokenLine } from '@dao-dao/stateful'
import { TokenCardProps } from '@dao-dao/types'

import { NftCard, NftCardProps } from '../NftCard'
import { makeProps as makeNftCardProps } from '../NftCard.stories'
import { makeProps as makeTokenCardProps } from '../token/TokenCard.stories'
import { WalletBalances } from './WalletBalances'

export default {
  title: 'DAO DAO / packages / stateless / pages / WalletBalances',
  component: WalletBalances,
} as ComponentMeta<typeof WalletBalances<TokenCardProps, NftCardProps>>

const Template: ComponentStory<
  typeof WalletBalances<TokenCardProps, NftCardProps>
> = (args) => <WalletBalances {...args} />

export const Default = Template.bind({})
Default.args = {
  accounts: [],
  tokens: {
    loading: false,
    data: [makeTokenCardProps(true), makeTokenCardProps()],
  },
  hiddenTokens: {
    loading: false,
    data: [],
  },
  TokenLine: WalletTokenLine,
  nfts: {
    loading: false,
    data: [
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
    ],
  },
  NftCard,
  ButtonLink,
  IconButtonLink,
}

export const Loading = Template.bind({})
Loading.args = {
  accounts: [],
  tokens: { loading: true },
  hiddenTokens: { loading: true },
  TokenLine: WalletTokenLine,
  nfts: { loading: true },
  NftCard,
  ButtonLink,
  IconButtonLink,
}
