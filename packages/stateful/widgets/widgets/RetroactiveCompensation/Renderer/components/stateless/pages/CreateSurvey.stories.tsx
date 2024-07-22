import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeTokenProps as makeNewAttributeTokenProps } from '../NewAttribute.stories'
import { CreateSurvey, CreateSurveyProps } from './CreateSurvey'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / RetroactiveCompensation / components / stateless / pages / CreateSurvey',
  component: CreateSurvey,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof CreateSurvey>

const Template: ComponentStory<typeof CreateSurvey> = (args) => (
  <CreateSurvey {...args} />
)

export const makeProps = (): CreateSurveyProps => ({
  loading: false,
  onCreate: async () => alert('create'),
  ...makeNewAttributeTokenProps(),
})

export const Default = Template.bind({})
Default.args = makeProps()
