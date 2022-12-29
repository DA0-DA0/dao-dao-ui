import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalWalletVote } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ProposalWalletVote'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ProfileVoteCard } from './ProfileVoteCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / profile / ProfileVoteCard',
  component: ProfileVoteCard,
} as ComponentMeta<typeof ProfileVoteCard>

const Template: ComponentStory<typeof ProfileVoteCard> = (args) => (
  <div className="max-w-xs">
    <ProfileVoteCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  votingPower: 32.4,
  daoName: 'Dog Dao',
  walletProfile: {
    loading: false,
    data: {
      nonce: 0,
      imageUrl: '/noah.jpg',
      name: '@Modern-Edamame',
      nft: null,
    },
  },
  vote: <ProposalWalletVote fallback="hasNoVote" vote={Vote.Yes} />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A31004',
  },
}
