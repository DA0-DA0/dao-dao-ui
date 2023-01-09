import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VoteDisplay } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ProposalVotes/VoteDisplay'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { getFallbackImage } from '@dao-dao/utils'

import { ProfileDisplay } from '../profile/ProfileDisplay'
import { ProposalVotes, ProposalVotesProps } from './ProposalVotes'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalVotes',
  component: ProposalVotes,
  // Don't export helper function `makeProps`.
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProposalVotes>

const Template: ComponentStory<typeof ProposalVotes<Vote>> = (args) => (
  <div className="max-w-2xl">
    <ProposalVotes {...args} />
  </div>
)

export const makeProps = (): ProposalVotesProps<Vote> => ({
  votes: {
    loading: false,
    data: [...Array(10)].map(() => ({
      voterAddress: 'juno123ihuprfiuosdjfiu98349fi0ewjgui',
      // 25% chance of No, 75% chance of Yes
      vote: Math.random() < 0.25 ? Vote.No : Vote.Yes,
      votingPowerPercent: 0.0432,
      // Within the past 5 days.
      votedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
    })),
  },
  votingOpen: true,
  ProfileDisplay: (props) => (
    <ProfileDisplay
      loadingProfile={{
        loading: false,
        data: {
          address: props.address,
          name: null,
          imageUrl: getFallbackImage(props.address),
        },
      }}
      {...props}
    />
  ),
  VoteDisplay,
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=983%3A90882',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...makeProps(),
  votes: { loading: true },
}
