import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CwProposalSingleAdapter } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single'
import { WalletProviderDecorator } from '@dao-dao/storybook/decorators'
import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators/makeAppLayoutDecorator'
import { makeCreateDaoFormDecorator } from '@dao-dao/storybook/decorators/makeCreateDaoFormDecorator'
import { Cw20StakedBalanceVotingAdapter } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting'

import { DaoCreateSidebarCard } from '../DaoCreateSidebarCard'
import { CreateDaoReview } from './Review'

export default {
  title: 'DAO DAO / packages / ui / components / dao / create / pages / Review',
  component: CreateDaoReview,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(3, {
      name: 'Evil Cow DAO',
      description: "There are evil cows all over the place. Let's milk 'em!",
      imageUrl:
        'https://ipfs.stargaze.zone/ipfs/QmbGvE3wmxex8KiBbbvMjR8f9adR28s3XkiZSTuGmHoMHV/33.jpg',
      votingModuleAdapter: {
        id: Cw20StakedBalanceVotingAdapter.id,
        data: {
          ...Cw20StakedBalanceVotingAdapter.daoCreation!.defaultConfig,
          newInfo: {
            ...Cw20StakedBalanceVotingAdapter.daoCreation!.defaultConfig
              .newInfo,
            symbol: 'TST',
            name: 'Test Token',
          },
        },
      },
      proposalModuleAdapters: [
        {
          id: CwProposalSingleAdapter.id,
          data: {
            ...CwProposalSingleAdapter.daoCreation.defaultConfig,
            proposalDeposit: {
              amount: 5.2,
              refundFailed: false,
            },
          },
        },
      ],
    }),
    makeAppLayoutDecorator({
      rightSidebarProps: {
        children: <DaoCreateSidebarCard />,
      },
    }),
    WalletProviderDecorator,
  ],
} as ComponentMeta<typeof CreateDaoReview>

// makeCreateDaoFormDecorator renders the page based on the initialIndex set to
// `3` in the decorators above.
const Template: ComponentStory<typeof CreateDaoReview> = (_args) => <></>

export const Default = Template.bind({})
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=981%3A45165',
  },
}
