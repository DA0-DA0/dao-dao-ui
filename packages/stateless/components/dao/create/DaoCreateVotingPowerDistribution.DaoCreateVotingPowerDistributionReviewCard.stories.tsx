import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileDisplay } from '@dao-dao/stateful/components/ProfileDisplay'

import {
  DaoCreateVotingPowerDistributionReviewCard,
  VOTING_POWER_DISTRIBUTION_COLORS,
} from './DaoCreateVotingPowerDistribution'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / DaoCreateVotingPowerDistributionReviewCard',
  component: DaoCreateVotingPowerDistributionReviewCard,
} as ComponentMeta<typeof DaoCreateVotingPowerDistributionReviewCard>

const Template: ComponentStory<
  typeof DaoCreateVotingPowerDistributionReviewCard
> = (args) => (
  <div className="max-w-xl">
    <DaoCreateVotingPowerDistributionReviewCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  ProfileDisplay,
  pieData: [
    {
      value: 15,
      color: VOTING_POWER_DISTRIBUTION_COLORS[0],
    },
    {
      value: 85,
      color: 'rgba(243, 246, 248, 0.4)',
    },
  ],
  tierData: [
    {
      name: 'Treasury',
      color: 'rgba(243, 246, 248, 0.4)',
      readableValue: '85%',
    },
    {
      name: 'Core members',
      color: VOTING_POWER_DISTRIBUTION_COLORS[0],
      members: [
        {
          address: 'juno49hndidfcjf928u12wds1vf11jieds8d9',
          readableValue: '8%',
        },
        {
          address: 'juno49hndidfcjf928u12wds1vf11jieds8d9',
          readableValue: '5%',
        },
        {
          address: 'juno49hndidfcjf928u12wds1vf11jieds8d9',
          readableValue: '2%',
        },
      ],
    },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=981%3A45276',
  },
}
