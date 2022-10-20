import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CwdProposalSingleAdapter } from '@dao-dao/proposal-module-adapter'
import { WalletProviderDecorator } from '@dao-dao/storybook/decorators'
import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators/makeAppLayoutDecorator'
import { makeCreateDaoFormDecorator } from '@dao-dao/storybook/decorators/makeCreateDaoFormDecorator'
import { CwdVotingCw20StakedAdapter } from '@dao-dao/voting-module-adapter'

import { CreateDaoVoting } from './CreateDaoVoting'

export default {
  title:
    'DAO DAO / packages / ui / components / dao / create / pages / CreateDaoVoting',
  component: CreateDaoVoting,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(2, {
      name: 'Evil Cow DAO',
      description: "There are evil cows all over the place. Let's milk 'em!",
      imageUrl:
        'https://ipfs.stargaze.zone/ipfs/QmbGvE3wmxex8KiBbbvMjR8f9adR28s3XkiZSTuGmHoMHV/33.jpg',
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
