import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalYourVote } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/components/ProposalYourVote'
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
  walletName: '@Modern-Edamame',
  profileImgUrl: '/edamame.png',
  vote: <ProposalYourVote vote={Vote.Yes} />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A31004',
  },
}
