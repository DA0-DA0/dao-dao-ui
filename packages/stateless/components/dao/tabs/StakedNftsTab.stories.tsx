import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { NftCard, NftCardProps } from '../../NftCard'
import { makeProps as makeNftCardProps } from '../../NftCard.stories'
import { StakedNftsTab } from './StakedNftsTab'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / tabs / StakedNftsTab',
  component: StakedNftsTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof StakedNftsTab>

const Template: ComponentStory<typeof StakedNftsTab<NftCardProps>> = (args) => (
  <StakedNftsTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
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
}

export const Loading = Template.bind({})
Loading.args = {
  nfts: { loading: true },
  NftCard,
}
