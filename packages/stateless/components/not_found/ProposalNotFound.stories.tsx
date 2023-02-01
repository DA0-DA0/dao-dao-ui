import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalNotFound } from './ProposalNotFound'

export default {
  title:
    'DAO DAO / packages / stateless / components / not_found / ProposalNotFound',
  component: ProposalNotFound,
} as ComponentMeta<typeof ProposalNotFound>

const Template: ComponentStory<typeof ProposalNotFound> = (_args) => (
  <ProposalNotFound />
)

export const Default = Template.bind({})
