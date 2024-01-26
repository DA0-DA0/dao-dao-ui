import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoFiatDepositModal, TreasuryHistoryGraph } from '@dao-dao/stateful'
import { CHAIN_ID } from '@dao-dao/storybook'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { TokenCardProps } from '@dao-dao/types'

import { NftCard, NftCardProps } from '../../NftCard'
import { makeProps as makeNftCardProps } from '../../NftCard.stories'
import { TokenCard } from '../../token/TokenCard'
import { makeProps as makeTokenCardProps } from '../../token/TokenCard.stories'
import { TreasuryAndNftsTab } from './TreasuryAndNftsTab'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / tabs / TreasuryAndNftsTab',
  component: TreasuryAndNftsTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof TreasuryAndNftsTab>

const Template: ComponentStory<
  typeof TreasuryAndNftsTab<TokenCardProps, NftCardProps & { key: string }>
> = (args) => <TreasuryAndNftsTab {...args} />

export const Default = Template.bind({})
Default.args = {
  tokens: {
    [CHAIN_ID]: {
      loading: false,
      errored: false,
      data: [makeTokenCardProps(true), makeTokenCardProps()],
    },
  },
  TokenCard,
  nfts: {
    loading: false,
    data: {
      [CHAIN_ID]: {
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
    },
  },
  NftCard,
  isMember: true,
  addCollectionHref: '#',
  FiatDepositModal: DaoFiatDepositModal,
  TreasuryHistoryGraph,
}

export const Loading = Template.bind({})
Loading.args = {
  tokens: { [CHAIN_ID]: { loading: true, errored: false } },
  TokenCard,
  nfts: {
    loading: false,
    data: { [CHAIN_ID]: { loading: true, errored: false } },
  },
  NftCard,
  isMember: true,
  addCollectionHref: '#',
  FiatDepositModal: DaoFiatDepositModal,
  TreasuryHistoryGraph,
}
