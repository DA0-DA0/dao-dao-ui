import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NoProposals } from '@dao-dao/icons'

import { NoContent } from './NoContent'

export default {
  title: 'DAO DAO / packages / ui / components / NoContent',
  component: NoContent,
} as ComponentMeta<typeof NoContent>

const Template: ComponentStory<typeof NoContent> = (args) => (
  <NoContent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: NoProposals,
  actionNudge: 'Create the first one?',
  body: 'No proposals to vote on yet.',
  buttonLabel: 'New proposal',
  href: '#',
}
