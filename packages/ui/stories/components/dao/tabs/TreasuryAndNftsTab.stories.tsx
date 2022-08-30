import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TreasuryAndNftsTab } from 'components/dao/tabs/TreasuryAndNftsTab'
import { makeProps as makeNftCardProps } from 'stories/components/nft/NftCard.stories'
import { makeProps as makeTokenCardProps } from 'stories/components/TokenCard.stories'

export default {
  title: 'DAO DAO UI V2 / components / dao / home / TreasuryAndNftsTab',
  component: TreasuryAndNftsTab,
} as ComponentMeta<typeof TreasuryAndNftsTab>

const Template: ComponentStory<typeof TreasuryAndNftsTab> = (args) => (
  <TreasuryAndNftsTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  tokens: [makeTokenCardProps(true), makeTokenCardProps()],
  nfts: [
    makeNftCardProps(),
    makeNftCardProps(),
    makeNftCardProps(),
    makeNftCardProps(),
    makeNftCardProps(),
  ],
}
