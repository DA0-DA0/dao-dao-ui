import { HowToVoteRounded } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NoContent } from './NoContent'

export default {
  title: 'DAO DAO / packages / stateless / components / NoContent',
  component: NoContent,
} as ComponentMeta<typeof NoContent>

const Template: ComponentStory<typeof NoContent> = (args) => (
  <NoContent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: HowToVoteRounded,
  actionNudge: 'Create the first one?',
  body: 'No proposals to vote on yet.',
  buttonLabel: 'New proposal',
  href: '#',
}
