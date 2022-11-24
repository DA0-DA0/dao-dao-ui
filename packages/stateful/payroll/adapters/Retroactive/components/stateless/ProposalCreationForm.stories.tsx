import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IdentityProfileDisplay } from '../stateful/IdentityProfileDisplay'
import { makeSurvey } from './ContributionForm.stories'
import { ProposalCreationForm } from './ProposalCreationForm'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / ProposalCreationForm',
  component: ProposalCreationForm,
} as ComponentMeta<typeof ProposalCreationForm>

const Template: ComponentStory<typeof ProposalCreationForm> = (args) => (
  <ProposalCreationForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  status: {
    survey: makeSurvey(),
    contribution: 'this is my contribution\n\npls give me money',
    rated: false,
  },
  completeRatings: {
    contributions: [
      {
        id: 1,
        contributor: {
          publicKey: 'publicKey1',
          address: 'juno1',
        },
        content: 'I contributed so much of my BLOOD SWEAT AND TEARS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        averageRatingPerAttribute: [0, 30],
        tokens: [
          {
            denomOrAddress: 'ujuno',
            amount: '0',
          },
          {
            denomOrAddress: 'ujuno',
            amount: '10000000000',
          },
        ],
      },
      {
        id: 2,
        contributor: {
          publicKey: 'publicKey2',
          address: 'juno2',
        },
        content:
          "i did absolutely nothing but i expect money because i'm around",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        averageRatingPerAttribute: [100, 75],
        tokens: [
          {
            denomOrAddress: 'ujuno',
            amount: '15000000000',
          },
          {
            denomOrAddress: 'ujuno',
            amount: '25000000000',
          },
        ],
      },
    ],
    ratings: [
      {
        rater: {
          publicKey: 'raterPublicKey1',
          address: 'raterAddress1',
        },
        contributions: [
          {
            id: 1,
            attributes: [null, 10],
          },
          {
            id: 2,
            attributes: [100, 100],
          },
        ],
      },
      {
        rater: {
          publicKey: 'raterPublicKey2',
          address: 'raterAddress2',
        },
        contributions: [
          {
            id: 1,
            attributes: [null, 50],
          },
          {
            id: 2,
            attributes: [null, 50],
          },
        ],
      },
    ],
  },
  onComplete: async () => alert('complete'),
  loading: false,
  IdentityProfileDisplay,
}
