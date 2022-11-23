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
    ratings: [
      {
        rater: {
          publicKey: 'raterPublicKey1',
          address: 'raterAddress1',
        },
        contributions: [
          {
            id: 1,
            attributes: [null, 2],
          },
          {
            id: 2,
            attributes: [50, 70],
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
            attributes: [null, null],
          },
          {
            id: 2,
            attributes: [0, 28],
          },
        ],
      },
    ],
  },
  onComplete: async () => alert('complete'),
  loading: false,
  IdentityProfileDisplay,
}
