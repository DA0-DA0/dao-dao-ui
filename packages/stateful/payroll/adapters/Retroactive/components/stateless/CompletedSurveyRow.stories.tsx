import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IconButtonLink } from '@dao-dao/stateless'

import { CompletedSurveyRow } from './CompletedSurveyRow'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / CompletedSurveyRow',
  component: CompletedSurveyRow,
} as ComponentMeta<typeof CompletedSurveyRow>

const Template: ComponentStory<typeof CompletedSurveyRow> = (args) => (
  <CompletedSurveyRow {...args} />
)

export const Default = Template.bind({})
Default.args = {
  survey: {
    id: 1,
    name: 'October 2022 Contributor Drop',
    contributionCount: 10,
    contributionsOpenedAt: new Date().toISOString(),
    proposalId: 'A1',
  },
  IconButtonLink,
}
