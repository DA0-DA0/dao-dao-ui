import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  DaoCreateVotingPowerDistributionBarChart,
  VOTING_POWER_DISTRIBUTION_COLORS,
} from './DaoCreateVotingPowerDistribution'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / DaoCreateVotingPowerDistributionBarChart',
  component: DaoCreateVotingPowerDistributionBarChart,
} as ComponentMeta<typeof DaoCreateVotingPowerDistributionBarChart>

const Template: ComponentStory<
  typeof DaoCreateVotingPowerDistributionBarChart
> = (args) => (
  <div className="max-w-xl">
    <DaoCreateVotingPowerDistributionBarChart {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  data: [
    {
      name: 'Treasury',
      value: 85,
      color: 'rgba(243, 246, 248, 0.4)',
    },
    {
      name: 'First tier',
      value: 15,
      color: VOTING_POWER_DISTRIBUTION_COLORS[0],
    },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A45482',
  },
}
