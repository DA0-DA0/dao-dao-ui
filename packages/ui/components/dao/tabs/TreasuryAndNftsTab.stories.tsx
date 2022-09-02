import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { makeProps as makeNftCardProps } from 'components/nft/NftCard.stories'
import { makeProps as makeTokenCardProps } from 'components/TokenCard.stories'

import { TreasuryAndNftsTab } from './TreasuryAndNftsTab'

export default {
  title:
    'DAO DAO / packages / ui / components / dao / tabs / TreasuryAndNftsTab',
  component: TreasuryAndNftsTab,
  decorators: [DaoPageWrapperDecorator],
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
