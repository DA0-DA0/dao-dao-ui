import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VoteDisplay } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/components/VoteDisplay'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'

import { ProposalVotes, ProposalVotesProps } from './ProposalVotes'

export default {
  title: 'DAO DAO / packages / ui / components / proposal / ProposalVotes',
  component: ProposalVotes,
  // Don't export helper function `makeProps`.
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProposalVotes>

const Template: ComponentStory<typeof ProposalVotes> = (args) => (
  <div className="max-w-2xl">
    <ProposalVotes {...args} />
  </div>
)

export const makeProps = (): ProposalVotesProps => ({
  votes: [...Array(10)]
    .map(() => ({
      when: new Date(
        // Within the past 5 days.
        Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000
      ),
      voterAddress: 'juno123ihuprfiuosdjfiu98349fi0ewjgui',
      // 25% chance of No, 75% chance of Yes
      vote: (
        <VoteDisplay
          className="flex-row-reverse gap-3 justify-between w-full font-sans text-xs link-text"
          vote={Math.random() < 0.25 ? Vote.No : Vote.Yes}
        />
      ),
      votingPowerPercent: 0.0432,
    }))
    .sort((a, b) => b.when.getTime() - a.when.getTime()),
  canLoadMore: true,
  loadingMore: false,
  loadMore: () => alert('load'),
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
  loadingMore: true,
}

export const LoadingNone = Template.bind({})
LoadingNone.args = {
  votes: [],
  canLoadMore: true,
  loadingMore: true,
}
