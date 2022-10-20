import { Check, Close, PanToolOutlined, Texture } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalWalletVote, ProposalWalletVoteProps } from '../proposal'
import { Pending as ProposalWalletVoteStory } from '../proposal/ProposalWalletVote.stories'
import { ProfileVoteCard } from './ProfileVoteCard'

export default {
  title: 'DAO DAO / packages / ui / components / profile / ProfileVoteCard',
  component: ProfileVoteCard,
} as ComponentMeta<typeof ProfileVoteCard>

const Template: ComponentStory<typeof ProfileVoteCard> = (args) => (
  <div className="max-w-xs">
    <ProfileVoteCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  currentVoteDisplay: (
    <ProposalWalletVote
      {...(ProposalWalletVoteStory.args as ProposalWalletVoteProps)}
    />
  ),
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
  loading: false,
  options: [
    { Icon: Check, label: 'Yes', value: 'yes' },
    { Icon: Close, label: 'No', value: 'no' },
    { Icon: PanToolOutlined, label: 'No with veto', value: 'noWithVeto' },
    { Icon: Texture, label: 'Abstain', value: 'abstain' },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16292',
  },
}
