import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UnstakingTaskStatus } from 'components'

import { UnstakingStatus } from './UnstakingStatus'

export default {
  title: 'DAO DAO / packages / ui / components / UnstakingStatus',
  component: UnstakingStatus,
} as ComponentMeta<typeof UnstakingStatus>

const Template: ComponentStory<typeof UnstakingStatus> = (args) => (
  <UnstakingStatus {...args} />
)

export const Unstaking = Template.bind({})
Unstaking.args = {
  status: UnstakingTaskStatus.Unstaking,
}
Unstaking.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=321%3A35845',
  },
}

export const ReadyToClaim = Template.bind({})
ReadyToClaim.args = {
  status: UnstakingTaskStatus.ReadyToClaim,
}
ReadyToClaim.parameters = Unstaking.parameters

export const Claimed = Template.bind({})
Claimed.args = {
  status: UnstakingTaskStatus.Claimed,
}
Claimed.parameters = Unstaking.parameters
