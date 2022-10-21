import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalLineLoader } from './ProposalLine'

export default {
  title: 'DAO DAO / packages / stateless / components / proposal / ProposalLineLoader',
  component: ProposalLineLoader,
} as ComponentMeta<typeof ProposalLineLoader>

const Template: ComponentStory<typeof ProposalLineLoader> = (_args) => (
  <ProposalLineLoader />
)

export const Default = Template.bind({})
Default.args = {}
