import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { NftCard, NftCardProps } from '../../nft/NftCard'
import { makeProps as makeNftCardProps } from '../../nft/NftCard.stories'
import { TokenCard, TokenCardProps } from '../../TokenCard'
import { makeProps as makeTokenCardProps } from '../../TokenCard.stories'
import { TreasuryAndNftsTab } from './TreasuryAndNftsTab'

export default {
  title:
    'DAO DAO / packages / ui / components / dao / tabs / TreasuryAndNftsTab',
  component: TreasuryAndNftsTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof TreasuryAndNftsTab>

const Template: ComponentStory<
  typeof TreasuryAndNftsTab<TokenCardProps, NftCardProps>
> = (args) => <TreasuryAndNftsTab {...args} />

export const Default = Template.bind({})
Default.args = {
  tokens: {
    loading: false,
    data: [makeTokenCardProps(true), makeTokenCardProps()],
  },
  TokenCard,
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
  isMember: true,
  registerNftCollectionHref: '#',
}

export const Loading = Template.bind({})
Loading.args = {
  tokens: { loading: true },
  TokenCard,
  nfts: { loading: true },
  NftCard,
  isMember: true,
  registerNftCollectionHref: '#',
}
