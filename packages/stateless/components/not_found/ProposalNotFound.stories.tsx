import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Trans } from '@dao-dao/stateful'

import { ProposalNotFound } from './ProposalNotFound'

export default {
  title:
    'DAO DAO / packages / stateless / components / not_found / ProposalNotFound',
  component: ProposalNotFound,
} as ComponentMeta<typeof ProposalNotFound>

const Template: ComponentStory<typeof ProposalNotFound> = (args) => (
  <ProposalNotFound {...args} />
)

export const Default = Template.bind({})
Default.args = {
  homeHref: '#',
  Trans,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
