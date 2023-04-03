import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IconButtonLink } from '@dao-dao/stateless'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import {
  Default as NewStoryFormStory,
  makeProps as makeNewSurveyFormProps,
} from './NewSurveyForm.stories'
import { TabRenderer } from './TabRenderer'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / RetroactiveCompensation / components / stateless / TabRenderer',
  component: TabRenderer,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof TabRenderer>

const Template: ComponentStory<typeof TabRenderer> = (args) => (
  <TabRenderer {...args} />
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
        contributionsOpenedAt: '2022-10-01T12:00:00.000Z',
        proposalId: 'A1',
        createdAtBlockHeight: 1,
      },
      {
        id: 2,
        name: 'November 2022 Contributor Drop',
        contributionCount: 7,
        contributionsOpenedAt: '2022-11-01T12:00:00.000Z',
        proposalId: 'A2',
        createdAtBlockHeight: 2,
      },
      {
        id: 3,
        name: 'December 2022 Contributor Drop',
        contributionCount: 14,
        contributionsOpenedAt: '2022-12-01T12:00:00.000Z',
        proposalId: 'A3',
        createdAtBlockHeight: 3,
      },
    ],
  },
  loadingMembershipDuringCompletedSurveys: {
    loading: false,
    data: [
      {
        height: 1,
        power: '0',
      },
      {
        height: 2,
        power: '5',
      },
      {
        height: 3,
        power: '10',
      },
    ],
  },
  isMember: true,
  NewSurveyForm: () => <NewStoryFormStory {...makeNewSurveyFormProps()} />,
  downloadCompletedSurvey: async (survey) => alert('download ' + survey.name),
  IconButtonLink,
}
