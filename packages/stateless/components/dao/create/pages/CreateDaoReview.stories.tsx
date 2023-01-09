import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoProposalSingleAdapter } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle'
import { DaoVotingCw20StakedAdapter } from '@dao-dao/stateful/voting-module-adapter/adapters/DaoVotingCw20Staked'
import { WalletProviderDecorator } from '@dao-dao/storybook/decorators'
import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators/makeAppLayoutDecorator'
import { makeCreateDaoFormDecorator } from '@dao-dao/storybook/decorators/makeCreateDaoFormDecorator'

import { CreateDaoReview } from './CreateDaoReview'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / pages / CreateDaoReview',
  component: CreateDaoReview,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(3, {
      name: 'Evil Cow DAO',
      description: "There are evil cows all over the place. Let's milk 'em!",
      imageUrl:
        'https://ipfs.stargaze.zone/ipfs/QmbGvE3wmxex8KiBbbvMjR8f9adR28s3XkiZSTuGmHoMHV/33.jpg',
      votingModuleAdapter: {
        id: DaoVotingCw20StakedAdapter.id,
        data: {
          ...DaoVotingCw20StakedAdapter.daoCreation!.defaultConfig,
          newInfo: {
            ...DaoVotingCw20StakedAdapter.daoCreation!.defaultConfig.newInfo,
            symbol: 'TST',
            name: 'Test Token',
          },
        },
      },
      proposalModuleAdapters: [
        {
          id: DaoProposalSingleAdapter.id,
          data: {
            ...DaoProposalSingleAdapter.daoCreation.defaultConfig,
            proposalDeposit: {
              amount: 5.2,
              refundFailed: false,
            },
          },
        },
      ],
    }),
    makeAppLayoutDecorator(),
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
