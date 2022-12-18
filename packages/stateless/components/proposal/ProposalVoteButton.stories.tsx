import { Texture } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ProposalVoteButton } from './ProposalVoteButton'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalVoteButton',
  component: ProposalVoteButton,
} as ComponentMeta<typeof ProposalVoteButton>

const Template: ComponentStory<typeof ProposalVoteButton<Vote>> = (args) => (
  <div className="max-w-xs">
    <ProposalVoteButton {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  option: {
    Icon: Texture,
    label: 'Abstain',
    value: Vote.Abstain,
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
