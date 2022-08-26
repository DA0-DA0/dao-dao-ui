import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SubmitButton } from 'components/Button/SubmitButton'

export default {
  title: 'DAO DAO UI / components / Button / SubmitButton',
  component: SubmitButton,
} as ComponentMeta<typeof SubmitButton>

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
)

export const Default = Template.bind({})
Default.args = {}
