import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletTokenLine } from '@dao-dao/stateful'
import { TokenCardProps } from '@dao-dao/types'

import { NftCard, NftCardProps } from '../nft/NftCard'
import { makeProps as makeNftCardProps } from '../nft/NftCard.stories'
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
  tokens: {
    loading: false,
    errored: false,
    data: [makeTokenCardProps(true), makeTokenCardProps()],
  },
  hiddenTokens: {
    loading: false,
    data: [],
  },
  TokenLine: WalletTokenLine,
  nfts: {
    loading: false,
    errored: false,
    data: [
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
    ],
  },
  NftCard,
}

export const Loading = Template.bind({})
Loading.args = {
  tokens: {
    loading: true,
    errored: false,
  },
  hiddenTokens: { loading: true },
  TokenLine: WalletTokenLine,
  nfts: {
    loading: true,
    errored: false,
  },
  NftCard,
}
