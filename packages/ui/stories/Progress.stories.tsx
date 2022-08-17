import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Progress } from 'components/Progress'

export default {
  title: 'DAO DAO UI / Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />

export const Default = Template.bind({})
Default.args = {
  "rows": null // TODO: Fill in default value.
}
