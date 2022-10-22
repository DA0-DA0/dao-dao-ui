import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CwdProposalSingleAdapter } from '@dao-dao/common/proposal-module-adapter'
import { CwdVotingCw20StakedAdapter } from '@dao-dao/common/voting-module-adapter'
import {
  WalletProviderDecorator,
  makeAppLayoutDecorator,
  makeCreateDaoFormDecorator,
} from '@dao-dao/storybook/decorators'

import { CreateDaoStart } from './CreateDaoStart'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / pages / CreateDaoStart',
  component: CreateDaoStart,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(0, {
      votingModuleAdapter: {
        id: CwdVotingCw20StakedAdapter.id,
        data: {
          ...CwdVotingCw20StakedAdapter.daoCreation!.defaultConfig,
          newInfo: {
            ...CwdVotingCw20StakedAdapter.daoCreation!.defaultConfig.newInfo,
            symbol: 'TST',
            name: 'Test Token',
          },
        },
      },
      proposalModuleAdapters: [
        {
          id: CwdProposalSingleAdapter.id,
          data: {
            ...CwdProposalSingleAdapter.daoCreation.defaultConfig,
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
