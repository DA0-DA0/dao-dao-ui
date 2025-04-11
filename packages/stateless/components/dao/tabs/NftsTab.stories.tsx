import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { NftCardProps } from '@dao-dao/types'

import { NftCard } from '../../nft/NftCard'
import { makeProps as makeNftCardProps } from '../../nft/NftCard.stories'
import { NftsTab } from './NftsTab'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / tabs / NftsTab',
  component: NftsTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof NftsTab>

const Template: ComponentStory<typeof NftsTab<NftCardProps>> = (args) => (
  <NftsTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  page: 1,
  setPage: () => {},
  pageSize: 30,
  nfts: {
    loading: false,
    errored: false,
    data: [
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
    ].map((props) => ({ ...props, key: props.tokenId })),
  },
  numNfts: {
    loading: false,
    errored: false,
    data: 5,
  },
  NftCard,
  description: 'This is the NFTs tab.',
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  nfts: { loading: true, errored: false },
  numNfts: { loading: true, errored: false },
}
