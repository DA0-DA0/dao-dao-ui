import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoProposalSingleAdapter } from '@dao-dao/stateful/proposal-module-adapter'
import { DaoVotingTokenBasedCreator } from '@dao-dao/stateful/voting-module-adapter/creators/DaoVotingTokenBased'
import {
  WalletProviderDecorator,
  makeCreateDaoFormDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import {
  DaoProposalSingleAdapterId,
  DaoVotingTokenBasedCreatorId,
} from '@dao-dao/utils'

import { CreateDaoStart } from './CreateDaoStart'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / pages / CreateDaoStart',
  component: CreateDaoStart,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(0, {
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
} as ComponentMeta<typeof CreateDaoStart>

// makeCreateDaoFormDecorator renders the page based on the initialIndex set to
// `0` in the decorators above.
const Template: ComponentStory<typeof CreateDaoStart> = (_args) => <></>

export const Default = Template.bind({})
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A44121',
  },
}
