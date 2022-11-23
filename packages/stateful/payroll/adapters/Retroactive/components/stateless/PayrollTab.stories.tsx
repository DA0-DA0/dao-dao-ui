import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  Default as NewStoryFormStory,
  makeProps as makeNewSurveyFormProps,
} from './NewSurveyForm.stories'
import { PayrollTab } from './PayrollTab'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / PayrollTab',
  component: PayrollTab,
} as ComponentMeta<typeof PayrollTab>

const Template: ComponentStory<typeof PayrollTab> = (args) => (
  <PayrollTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  loadingStatus: { loading: false, data: undefined },
  loadingCompletedSurveys: {
    loading: false,
    data: [
      {
        id: 1,
        name: 'October 2022 Contributor Drop',
        contributionCount: 10,
        openedAt: '2022-10-01T12:00:00.000Z',
      },
      {
        id: 2,
        name: 'November 2022 Contributor Drop',
        contributionCount: 7,
        openedAt: '2022-11-01T12:00:00.000Z',
      },
      {
        id: 3,
        name: 'December 2022 Contributor Drop',
        contributionCount: 14,
        openedAt: '2022-12-01T12:00:00.000Z',
      },
    ],
  },
  isMember: true,
  NewSurveyForm: () => <NewStoryFormStory {...makeNewSurveyFormProps()} />,
  selectCompletedSurvey: async (survey) => alert('select ' + survey.name),
}
