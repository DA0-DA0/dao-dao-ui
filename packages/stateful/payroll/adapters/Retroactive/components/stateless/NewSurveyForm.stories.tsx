import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeTokenProps as makeNewAttributeTokenProps } from './NewAttribute.stories'
import { NewSurveyForm, NewSurveyFormProps } from './NewSurveyForm'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / NewSurveyForm',
  component: NewSurveyForm,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof NewSurveyForm>

const Template: ComponentStory<typeof NewSurveyForm> = (args) => (
  <NewSurveyForm {...args} />
)

export const makeProps = (): NewSurveyFormProps => ({
  loading: false,
  onCreate: async () => alert('create'),
  ...makeNewAttributeTokenProps(),
})

export const Default = Template.bind({})
Default.args = makeProps()
