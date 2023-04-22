import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoProposalSingleAdapter } from '@dao-dao/stateful/proposal-module-adapter'
import { DaoVotingTokenBasedCreator } from '@dao-dao/stateful/voting-module-adapter/creators/DaoVotingTokenBased'
import { WalletProviderDecorator } from '@dao-dao/storybook/decorators'
import { makeCreateDaoFormDecorator } from '@dao-dao/storybook/decorators/makeCreateDaoFormDecorator'
import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators/makeDappLayoutDecorator'
import {
  DaoProposalSingleAdapterId,
  DaoVotingTokenBasedCreatorId,
} from '@dao-dao/utils'

import { CreateDaoVoting } from './CreateDaoVoting'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / pages / CreateDaoVoting',
  component: CreateDaoVoting,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(2, {
      name: 'Evil Cow DAO',
      description: "There are evil cows all over the place. Let's milk 'em!",
      imageUrl:
        'https://ipfs.stargaze.zone/ipfs/QmbGvE3wmxex8KiBbbvMjR8f9adR28s3XkiZSTuGmHoMHV/33.jpg',
      votingModuleCreator: {
        id: DaoVotingTokenBasedCreatorId,
        data: {
          ...DaoVotingTokenBasedCreator.defaultConfig,
          newInfo: {
            ...DaoVotingTokenBasedCreator.defaultConfig.newInfo,
            symbol: 'TST',
            name: 'Test Token',
          },
        },
      },
      proposalModuleAdapters: [
        {
          id: DaoProposalSingleAdapterId,
          data: {
            ...DaoProposalSingleAdapter.daoCreation.extraVotingConfig?.default,
            proposalDeposit: {
              amount: 5.2,
              refundFailed: false,
            },
          },
        },
      ],
    }),
    makeDappLayoutDecorator(),
    WalletProviderDecorator,
  ],
} as ComponentMeta<typeof CreateDaoVoting>

// makeCreateDaoFormDecorator renders the page based on the initialIndex set to
// `2` in the decorators above.
const Template: ComponentStory<typeof CreateDaoVoting> = (_args) => <></>

export const Default = Template.bind({})
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A45636',
  },
}
