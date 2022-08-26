import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileVoteButton } from 'components/profile/ProfileVoteButton'

export default {
  title: 'DAO DAO UI V2 / components / profile / ProfileVoteButton',
  component: ProfileVoteButton,
} as ComponentMeta<typeof ProfileVoteButton>

const Template: ComponentStory<typeof ProfileVoteButton> = (args) => (
  <div className="max-w-xs">
    <ProfileVoteButton {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  variant: 'yes',
  pressed: true,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}
