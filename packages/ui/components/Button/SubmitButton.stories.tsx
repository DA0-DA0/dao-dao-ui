import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SubmitButton } from './SubmitButton'

export default {
  title: 'DAO DAO / packages / ui / components / Button / SubmitButton',
  component: SubmitButton,
} as ComponentMeta<typeof SubmitButton>

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Submit me',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
