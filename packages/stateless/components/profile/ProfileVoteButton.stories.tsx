import { Texture } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileVoteButton } from './ProfileVoteButton'

export default {
  title: 'DAO DAO / packages / stateless / components / profile / ProfileVoteButton',
  component: ProfileVoteButton,
} as ComponentMeta<typeof ProfileVoteButton>

const Template: ComponentStory<typeof ProfileVoteButton> = (args) => (
  <div className="max-w-xs">
    <ProfileVoteButton {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  option: {
    Icon: Texture,
    label: 'Abstain',
    value: 'abstain',
  },
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}

export const Pressed = Template.bind({})
Pressed.args = {
  ...Default.args,
  pressed: true,
}
Pressed.parameters = Default.args
