import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RebalancerProjector } from './RebalancerProjector'

export default {
  title: 'DAO DAO / packages / stateless / components / RebalancerProjector',
  component: RebalancerProjector,
} as ComponentMeta<typeof RebalancerProjector>

const Template: ComponentStory<typeof RebalancerProjector> = (args) => (
  <RebalancerProjector {...args} />
)

const numRebalances = 40

export const Default = Template.bind({})
Default.args = {
  pid: {
    kp: 0.5,
    ki: 0.2,
    kd: 0.1,
    interval: 1,
  },
  assets: [
    {
      symbol: 'NTRN',
      initialAmount: 1250,
      targetProportion: 5 / 8,
      // Random disturbance.
      prices: [...Array(numRebalances + 1)].reduce(
        (acc) => [
          ...acc,
          acc[acc.length - 1] * (1 + (Math.random() - 0.5) * 0.5),
        ],
        [0.4]
      ),
    },
    {
      symbol: 'USDC',
      initialAmount: 300,
      targetProportion: 3 / 8,
      // Constant at $1.
      prices: [...Array(numRebalances + 1)].map(() => 1),
    },
  ],
  rebalanceTimestamps: [...Array(numRebalances)].map(
    (_, index) =>
      new Date(new Date().getTime() - (numRebalances - index) * 1000)
  ),
}
