import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RebalancerProjector } from './RebalancerProjector'

export default {
  title: 'DAO DAO / packages / stateless / components / RebalancerProjector',
  component: RebalancerProjector,
} as ComponentMeta<typeof RebalancerProjector>

const Template: ComponentStory<typeof RebalancerProjector> = (args) => (
  <RebalancerProjector {...args} />
)

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
      currentAmount: 1250,
      targetProportion: 3 / 8,
      currentPrice: 0.4,
      projection: {
        type: 'random',
        disturbance: 0.1,
      },
    },
    {
      symbol: 'USDC',
      currentAmount: 300,
      targetProportion: 5 / 8,
      currentPrice: 1,
      projection: {
        type: 'linear',
        slope: 1,
      },
    },
  ],
  numRebalances: 40,
}
