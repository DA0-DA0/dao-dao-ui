import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalWalletVote } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/components/ProposalWalletVote'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'

import { ProfileVotedCard } from './ProfileVotedCard'

export default {
  title: 'DAO DAO / packages / ui / components / profile / ProfileVotedCard',
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
  walletAddress: 'wallet',
  walletName: '@Modern-Edamame',
  profileImgUrl: '/noah.jpg',
  vote: <ProposalWalletVote fallback="none" vote={Vote.Yes} />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A31004',
  },
}
