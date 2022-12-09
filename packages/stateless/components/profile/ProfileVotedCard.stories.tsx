import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalWalletVote } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ProposalWalletVote'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ProfileVotedCard } from './ProfileVotedCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / profile / ProfileVotedCard',
  component: ProfileVotedCard,
} as ComponentMeta<typeof ProfileVotedCard>

const Template: ComponentStory<typeof ProfileVotedCard> = (args) => (
  <div className="max-w-xs">
    <ProfileVotedCard {...args} />
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
  vote: <ProposalWalletVote fallback="none" vote={Vote.Yes} />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A31004',
  },
}
