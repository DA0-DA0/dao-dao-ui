import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  DaoFiatDepositModal,
  DaoTokenLine,
  TreasuryHistoryGraph,
} from '@dao-dao/stateful'
import { CHAIN_ID } from '@dao-dao/storybook'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { TokenCardProps } from '@dao-dao/types'

import { NftCard, NftCardProps } from '../../nft/NftCard'
import { makeProps as makeNftCardProps } from '../../nft/NftCard.stories'
import { makeProps as makeTokenCardProps } from '../../token/TokenCard.stories'
import { TreasuryTab } from './TreasuryTab'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / tabs / TreasuryTab',
  component: TreasuryTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof TreasuryTab>

const Template: ComponentStory<
  typeof TreasuryTab<TokenCardProps, NftCardProps & { key: string }>
> = (args) => <TreasuryTab {...args} />

export const Default = Template.bind({})
Default.args = {
  tokens: {
    [CHAIN_ID]: {
      loading: false,
      errored: false,
      data: [makeTokenCardProps(true), makeTokenCardProps()],
    },
  },
  TokenLine: DaoTokenLine,
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
  FiatDepositModal: DaoFiatDepositModal,
  TreasuryHistoryGraph,
}

export const Loading = Template.bind({})
Loading.args = {
  tokens: { [CHAIN_ID]: { loading: true, errored: false } },
  TokenLine: DaoTokenLine,
  nfts: {
    loading: false,
    data: { [CHAIN_ID]: { loading: true, errored: false } },
  },
  NftCard,
  FiatDepositModal: DaoFiatDepositModal,
  TreasuryHistoryGraph,
}
