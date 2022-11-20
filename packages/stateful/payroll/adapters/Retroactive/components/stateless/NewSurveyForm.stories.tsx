import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NewSurveyForm } from './NewSurveyForm'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / NewSurveyForm',
  component: NewSurveyForm,
} as ComponentMeta<typeof NewSurveyForm>

const Template: ComponentStory<typeof NewSurveyForm> = (args) => (
  <NewSurveyForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onCreate: async () => alert('create'),
}
