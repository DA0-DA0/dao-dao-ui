import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IdentityProfileDisplay } from '../stateful/IdentityProfileDisplay'
import { makeSurvey } from './ContributionForm.stories'
import { RatingForm } from './RatingForm'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / RatingForm',
  component: RatingForm,
} as ComponentMeta<typeof RatingForm>

const Template: ComponentStory<typeof RatingForm> = (args) => (
  <RatingForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  status: {
    survey: makeSurvey(),
    contribution: 'this is my contribution\n\npls give me money',
    rated: false,
  },
  data: {
    contributions: [
      {
        id: 1,
        contributor: {
          publicKey: 'publicKey1',
          address: 'juno1',
        },
        content: 'I did stuff',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        contributor: {
          publicKey: 'publicKey2',
          address: 'juno2',
        },
        content: 'I did other stuff\n:D',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    existingRatings: [],
  },
  onSubmit: async (data) =>
    alert('submit: ' + JSON.stringify(data, undefined, 2)),
  loading: false,
  IdentityProfileDisplay,
  cw20TokenInfos: [
    {
      address: 'usdc',
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      total_supply: '1000000000000000',
    },
  ],
  prices: [
    {
      denom: 'ujuno',
      amount: 1,
      timestamp: new Date(),
    },
    {
      denom: 'usdc',
      amount: 1,
      timestamp: new Date(),
    },
  ],
}
