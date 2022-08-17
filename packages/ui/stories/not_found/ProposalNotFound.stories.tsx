import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalNotFound } from 'components/not_found/ProposalNotFound'

export default {
  title: 'DAO DAO UI / not_found / ProposalNotFound',
  component: ProposalNotFound,
} as ComponentMeta<typeof ProposalNotFound>

const Template: ComponentStory<typeof ProposalNotFound> = (args) => (
  <ProposalNotFound {...args} />
)

export const Default = Template.bind({})
Default.args = {
  homeHref: '#',
}

// TODO: Fix story.
